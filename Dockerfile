# Stage 1: Build the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json 
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Define build arguments to pass the environment variables
ARG API_BASE_URL
ARG FIREBASE_API_KEY
ARG FIREBASE_AUTH_DOMAIN
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_STORAGE_BUCKET
ARG FIREBASE_MESSAGING_SENDER_ID
ARG FIREBASE_APP_ID

# Pass environment variables to dotenv during the build
RUN echo "API_BASE_URL=${API_BASE_URL}" >> .env \
    && echo "FIREBASE_API_KEY=${FIREBASE_API_KEY}" >> .env \
    && echo "FIREBASE_AUTH_DOMAIN=${FIREBASE_AUTH_DOMAIN}" >> .env \
    && echo "FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}" >> .env \
    && echo "FIREBASE_STORAGE_BUCKET=${FIREBASE_STORAGE_BUCKET}" >> .env \
    && echo "FIREBASE_MESSAGING_SENDER_ID=${FIREBASE_MESSAGING_SENDER_ID}" >> .env \
    && echo "FIREBASE_APP_ID=${FIREBASE_APP_ID}" >> .env

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM nginx:alpine

ARG PORT=80
ENV PORT=${PORT}
ARG API_BASE_URL
ENV API_BASE_URL=${API_BASE_URL}

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx will use
EXPOSE ${PORT}

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Add a health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT} || exit 1