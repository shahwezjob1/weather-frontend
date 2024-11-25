# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the source code into the container
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use NGINX to serve the app
FROM nginx:alpine

# Copy the build output to NGINX's HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
