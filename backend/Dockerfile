# Use Node.js image for backend
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port used by your backend (usually 5000)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
