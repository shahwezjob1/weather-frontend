# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code into the container
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the React app using a lightweight web server
FROM nginx:alpine

# Copy the build artifacts from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that the app will be available on
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
