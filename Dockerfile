# Use an official Node runtime as a parent image
FROM node:18-alpine

# set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose ports for both Vite and Storybook
EXPOSE 3000 6006

# Start development server
CMD ["npm", "run", "dev"]