# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Install global packages
RUN npm install -g concurrently json-server

# Add development specific environment variables
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Expose Vite, Storybook, and json-server ports
EXPOSE 5173 6006 3001

# Start development server with both Vite, Storybook, and json-server
CMD ["npm", "run", "dev"]