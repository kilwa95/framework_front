# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Add app
COPY . .

# Install json-server globally along with concurrently
RUN npm install -g concurrently json-server

# Install dependencies
RUN npm install

# Expose Vite, Storybook, and json-server ports
EXPOSE 5173 6006 3001

# Start development server with both Vite, Storybook, and json-server
CMD ["npm", "run", "dev"]