# Use an official Node runtime as the build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if using yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use Nginx to serve the build files
FROM nginx:stable-alpine

# Copy build files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
