# Dockerfile Final, de Producción y Corregido

# --- Etapa 1: Build ---
FROM node:18-slim as builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build # Aquí solo construimos el código


# --- Etapa 2: Production ---
FROM node:18-slim
WORKDIR /usr/src/app

# Instalamos Nginx y OpenSSL
RUN apt-get update -y && apt-get install -y nginx openssl

# Copiamos todo lo necesario para producción desde la etapa 'builder'
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Copiamos nuestra configuración de Nginx y el script de arranque.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Exponemos el puerto de Nginx.
EXPOSE 80

# El comando de inicio es nuestro script, que se encargará de todo.
CMD ["./entrypoint.sh"]