FROM node:20-slim AS base
WORKDIR /app

# Install Python and build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python-is-python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000
EXPOSE 5555 