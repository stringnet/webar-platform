# --- Etapa 1: Build ---
# Usamos node:18-slim (basado en Debian) para máxima compatibilidad
FROM node:18-slim as builder

WORKDIR /usr/src/app

# No necesitamos instalar herramientas extra de build como python/g++ aquí
# a menos que una dependencia de npm lo requiera explícitamente.
# Por ahora lo mantenemos simple.

COPY package*.json ./
RUN npm install

COPY . .

# Generamos el cliente aquí para verificar el schema durante el build
RUN npx prisma generate

# Construimos la aplicación
RUN npm run build


# --- Etapa 2: Production ---
# Empezamos con una imagen fresca y limpia
FROM node:18-slim

WORKDIR /usr/src/app

# Instalamos solo Nginx. OpenSSL ya viene en la imagen base de node:18-slim
RUN apt-get update -y && apt-get install -y nginx

# Copiamos solo lo necesario para producción
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Exponemos el puerto de Nginx
EXPOSE 80

# El script de arranque se encarga de todo
CMD ["./entrypoint.sh"]