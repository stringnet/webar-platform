# Dockerfile Final y Robusto para la API

# --- Etapa 1: Build ---
# Usamos node:18-slim (basado en Debian) para máxima compatibilidad
FROM node:18-slim as builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# --- Etapa 2: Production ---
# Usamos node:18-slim como base, que ya tiene Node.js y un OS completo y compatible
FROM node:18-slim
WORKDIR /usr/src/app

# Instalamos Nginx dentro de esta imagen de Node.js
# apt-get es el gestor de paquetes de Debian (equivalente a apk en Alpine)
RUN apt-get update && apt-get install -y nginx

# Copiamos todo lo necesario desde la etapa 'builder'
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Copiamos nuestra configuración de Nginx y el script de arranque
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Exponemos el puerto de Nginx
EXPOSE 80

# El script de arranque sigue siendo el mismo y funcionará correctamente aquí
CMD ["./entrypoint.sh"]
