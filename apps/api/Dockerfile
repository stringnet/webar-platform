# --- Etapa 1: Build ---
FROM node:18-slim as builder
WORKDIR /usr/src/app

# Declaramos que recibiremos la DATABASE_URL durante el build
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ¡LÍNEA CLAVE! Ejecutamos la migración aquí para crear las tablas
RUN npm run prisma:deploy


# --- Etapa 2: Production ---
FROM node:18-slim
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y nginx openssl

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# No necesitamos el schema de prisma en producción, solo el cliente generado
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Exponemos el puerto de Nginx
EXPOSE 80

# El comando de inicio es nuestro script
CMD ["./entrypoint.sh"]