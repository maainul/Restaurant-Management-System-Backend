# How to RUN in Local : 

1. Clone Repo :
```bash
git clone https://github.com/WaveTech-Info-Ltd/table-tech-backend.git
```
2. Install Packages :
```bash
npm i
```
3. Setup DB in Mongodb: Database name : rmsdb
4. Run Project :
```bash
npm run dev
```


# RUN in Production :

1. Build Project
```bash
npm run build
```

2. Run Project
```bash
npm start
```
# Build With Compose :

## Build Images :
```bash
docker-compose up --build
```


# Dockerize
---

### **Step 1: Keep Your Dockerfile (No Changes)**
```dockerfile
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
```

---

### **Step 2: Build the Docker Image**
```bash
docker build -t maainul/table-tech-backend:latest .
```
- `-t` → Tags the image with a name (`maainul/table-tech-backend`) and tag (`latest`).
- `.` → Builds using the current directory (where your `Dockerfile` is).

---

### **Step 3: Test Locally Before Pushing**
```bash
docker-compose up -d
```
- Verify that your app and MongoDB start correctly.

---

### **Step 4: Log in to Docker Hub**
```bash
docker login
```
- Enter your **Docker Hub username** and **password** when prompted.

---

### **Step 5: Push the Image to Docker Hub**
```bash
docker push maainul/table-tech-backend:latest
```
- This uploads your image to Docker Hub under your account (`maainul`).

---

### **Step 6: Share the `docker-compose.yml` with Your Team**
Your team can now use the image directly from Docker Hub:
```yaml
version: '3.8'

services:
  app:
    image: maainul/table-tech-backend:latest  # Pulls from Docker Hub
    ports:
      - "8080:8080"
    environment:
      - MONGO_URL=mongodb://mongo:27017/rmsdb
    depends_on:
      - mongo

  mongo:
    image: mongo:6.0
    container_name: my-mongo-db
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

---

### **Step 7: Your Team Can Now Run It**
They just need to run:
```bash
docker-compose up -d
```
- This will:
  1. Pull `maainul/table-tech-backend:latest` from Docker Hub.
  2. Start MongoDB.
  3. Run your Node.js app.

---

### **Optional Improvements (If Needed)**
1. **Use Version Tags (Recommended)**  
   Instead of `latest`, use semantic versioning (e.g., `v1.0.0`):
   ```bash
   docker build -t maainul/table-tech-backend:v1.0.0 .
   docker push maainul/table-tech-backend:v1.0.0
   ```
   - Helps avoid breaking changes when `latest` updates.

2. **Add a `.dockerignore` File**  
   Prevents unnecessary files (like `node_modules`) from being copied:
   ```
   node_modules
   .git
   .env
   ```

3. **Add Health Checks (Optional)**  
   In `docker-compose.yml`, you can add:
   ```yaml
   healthcheck:
     test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
     interval: 30s
     timeout: 10s
     retries: 3
   ```

---

## Docker Run Without Codebase:
```bash
docker pull maainul/table-tech-backend:latest && docker run maainul/table-tech-backend:latest
docker run maainul/table-tech-backend:latest
```
# Build With Compose :

## Build Images :
```bash
docker-compose up --build
```


# Dockerize
---

### **Step 1: Keep Your Dockerfile (No Changes)**
```dockerfile
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
```

---

### **Step 2: Build the Docker Image**
```bash
# First time:
docker-compose up -d

# To update later:
docker-compose down && docker-compose pull && docker-compose up -d
```
- `-t` → Tags the image with a name (`maainul/table-tech-backend`) and tag (`latest`).
- `.` → Builds using the current directory (where your `Dockerfile` is).

---

### **Step 3: Test Locally Before Pushing**
```bash
docker-compose up -d
```
- Verify that your app and MongoDB start correctly.

---

### **Step 4: Log in to Docker Hub**
```bash
docker login
```
- Enter your **Docker Hub username** and **password** when prompted.

---

### **Step 5: Push the Image to Docker Hub**
```bash
docker push maainul/table-tech-backend:latest
```
- This uploads your image to Docker Hub under your account (`maainul`).

---

### **Step 6: Share the `docker-compose.yml` with Your Team**
Your team can now use the image directly from Docker Hub:
```yaml
version: '3.8'

services:
  app:
    image: maainul/table-tech-backend:latest  # Pulls from Docker Hub
    ports:
      - "8080:8080"
    environment:
      - MONGO_URL=mongodb://mongo:27017/rmsdb
    depends_on:
      - mongo

  mongo:
    image: mongo:6.0
    container_name: my-mongo-db
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

---

### **Step 7: Your Team Can Now Run It**
They just need to run:
```bash
docker-compose up -d
```
- This will:
  1. Pull `maainul/table-tech-backend:latest` from Docker Hub.
  2. Start MongoDB.
  3. Run your Node.js app.

---

### **Optional Improvements (If Needed)**
1. **Use Version Tags (Recommended)**  
   Instead of `latest`, use semantic versioning (e.g., `v1.0.0`):
   ```bash
   docker build -t maainul/table-tech-backend:v1.0.0 .
   docker push maainul/table-tech-backend:v1.0.0
   ```
   - Helps avoid breaking changes when `latest` updates.

2. **Add a `.dockerignore` File**  
   Prevents unnecessary files (like `node_modules`) from being copied:
   ```
   node_modules
   .git
   .env
   ```

3. **Add Health Checks (Optional)**  
   In `docker-compose.yml`, you can add:
   ```yaml
   healthcheck:
     test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
     interval: 30s
     timeout: 10s
     retries: 3
   ```

---

## Docker Run Without Codebase: Pull and RUN
```bash
docker pull maainul/table-tech-backend:latest && docker run maainul/table-tech-backend:latest
docker run maainul/table-tech-backend:latest
```

## Run in MongoDb Compass :

1. Windows (Services):

```Press Win + R → services.msc → Stop "MongoDB Server"```

2. Paste this in the connection String :
```mongodb://localhost:27017/rmsdb```