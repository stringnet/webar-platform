# --- Etapa 1: Build ---
FROM node:18-slim as builder
WORKDIR /usr/src/app

# Instala las herramientas de construcción necesarias
RUN apt-get update && apt-get install -y python3 make g++

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Etapa 2: Production ---
FROM node:18-slim
WORKDIR /usr/src/app

# ¡LÍNEA CLAVE! Instalamos la versión de libssl que Prisma 5 necesita en Debian
RUN apt-get update && apt-get install -y openssl libssl1.1

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Para esta prueba final, vamos a ejecutar la app directamente sin Nginx
# para asegurar que el problema de base está resuelto.
EXPOSE 3000
CMD ["npm", "run", "start:prod"]