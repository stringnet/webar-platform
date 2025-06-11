# Dockerfile Final y Definitivo

# --- Etapa 1: Build ---
# Construimos la aplicación en un ambiente limpio.
FROM node:18-slim as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Damos permisos a todas las herramientas que npm instaló.
RUN chmod +x /usr/src/app/node_modules/.bin/*

# Construimos la aplicación.
RUN npm run build


# --- Etapa 2: Production ---
# Usamos una imagen limpia de Node.js para producción.
FROM node:18-slim

WORKDIR /usr/src/app

# Instalamos solo las dependencias de producción y Nginx.
# --only=production hace la imagen final mucho más pequeña y segura.
RUN apt-get update && apt-get install -y nginx openssl
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production

# Copiamos los archivos construidos y necesarios desde la etapa 'builder'.
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Copiamos nuestra configuración de Nginx y el script de arranque.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Exponemos el puerto de Nginx.
EXPOSE 80

# El comando de inicio es nuestro script.
CMD ["./entrypoint.sh"]