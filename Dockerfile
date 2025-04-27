FROM node:20.9.0-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for building)
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Install only production dependencies (clean up devDependencies)
RUN npm prune --production

EXPOSE 8080
CMD ["npm", "start"]