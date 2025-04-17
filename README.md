
# CI/CD Pipeline for React App using Azure DevOps, Helm, AKS & ACR

## 📌 Overview

This project automates the CI/CD workflow for a React application using:
- Azure DevOps Pipelines
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Helm charts for deployment

## 📁 Project Structure

```
.
├── react-app/                    # React source code
├── react-app-chart/              # Helm chart for deployment
│   └── values.yaml               # Custom values for deployment
├── Dockerfile                    # Multi-stage build for React + NGINX
└── azure-pipelines.yml           # CI/CD pipeline
```

## 🚀 Prerequisites

Before setting up the pipeline:

1. ✅ Azure Container Registry (ACR) is created.
2. ✅ Azure Kubernetes Service (AKS) cluster is created.
3. ✅ Kubernetes Service Connection is set up in Azure DevOps.
4. ✅ ACR Docker registry service connection is added to Azure DevOps.
5. ✅ Helm chart is properly configured in `react-app-chart`.

## 🔧 Setup Instructions

### 1. 🐳 Dockerfile (at root level)

```Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

### 2. ⚙️ nginx.conf (root)

```nginx
pid /tmp/nginx.pid;

worker_processes 1;

events {
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    client_body_temp_path /tmp/client_body;
    proxy_temp_path /tmp/proxy;

    server {
        listen       8080;
        server_name  localhost;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            try_files $uri /index.html;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
}
```

### 3. 🧠 Helm Chart (react-app-chart/values.yaml)

```yaml
replicaCount: 2

image:
  repository: myreactappacr.azurecr.io/my-react-app
  pullPolicy: Always
  tag: "latest"

service:
  type: LoadBalancer
  port: 8080

podSecurityContext:
  fsGroup: 1000
  runAsNonRoot: true
  runAsUser: 1000

securityContext:
  capabilities:
    drop:
      - ALL
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  runAsUser: 1000

volumeMounts:
  - name: temp-volume
    mountPath: /tmp

volumes:
  - name: temp-volume
    emptyDir: {}
```

### 4. 🛠 Azure DevOps Pipeline (azure-pipelines.yml)

Refer to the `azure-pipelines.yml` file in the repo for the full working pipeline configuration.

## ▶️ Running the Pipeline

1. Push changes to the `main` branch.
2. The pipeline will:
   - Build and push Docker image to ACR
   - Publish Helm chart as artifact
   - Deploy to AKS using Helm
3. Access the app using the **EXTERNAL-IP**:
   ```bash
   kubectl get svc -n default
   ```

## 🧪 Troubleshooting

| Problem                           | Fix |
|----------------------------------|------|
| Pods stuck in `CrashLoopBackOff` | Check logs: `kubectl logs <pod>` |
| nginx.pid or `/tmp` errors       | Ensure proper volume mount for `/tmp` and `pid /tmp/nginx.pid` in config |
| No External IP                   | Change service type to `LoadBalancer` in `values.yaml` |
| Helm stuck on upgrade            | Delete stuck secrets: `kubectl delete secret sh.helm.release.v1.<release>.v<revision>` |

## 📦 Useful Commands

```bash
# Check pod logs
kubectl logs <pod-name> -n default

# Check service external IP
kubectl get svc -n default

# Helm release status
helm status my-react-app -n default

# Restart deployment
kubectl rollout restart deployment <deployment-name> -n default
```
