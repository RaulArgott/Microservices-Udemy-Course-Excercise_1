FROM node:22-slim

# Set environment variables
ENV CI=true
ENV WDS_SOCKET_PORT=0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install 

# Copy application files
COPY . .

# Expose application port (change as needed)
EXPOSE 3000

# Define startup command
CMD ["npm", "start"]
