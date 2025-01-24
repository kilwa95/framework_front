# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Add app
COPY . .

# Install concurrently globally and other dependencies
RUN npm install -g concurrently
RUN npm install

# Expose both Vite and Storybook ports
EXPOSE 5173 6006

# Start development server with both Vite and Storybook
CMD ["npm", "run", "dev"]