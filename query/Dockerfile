FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install 

# Copy application files
COPY . .

# Expose application port (change as needed)
EXPOSE 4002

# Define startup command
CMD ["npm", "start"]