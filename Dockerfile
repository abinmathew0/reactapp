# Use an official Node runtime as the build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use Nginx to serve the build files
FROM nginx:stable-alpine

# Remove default NGINX config (optional but clean)
RUN rm /etc/nginx/conf.d/default.conf

# Add a custom NGINX config that avoids read-only paths
COPY nginx.conf /etc/nginx/nginx.conf

# Copy build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
#d