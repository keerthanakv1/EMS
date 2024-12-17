# Use Node.js image for development
FROM node:18 AS development

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port used by the development server (usually 3000)
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
