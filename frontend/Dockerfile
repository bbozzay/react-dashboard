# Use Node 18 alpine image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run app
CMD [ "npm", "start" ]
