# Dockerfile Final y de Producción para la API

# --- Etapa 1: Build ---
# En esta etapa, instalamos todas las dependencias y construimos la aplicación.
FROM node:18-slim as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# --- ¡LÍNEA CLAVE AÑADIDA! ---
# Damos permisos de ejecución explícitos al ejecutable de Prisma.
# Esto soluciona el error "Permission denied".
RUN chmod +x /usr/src/app/node_modules/.bin/prisma

# --- LÍNEA CORREGIDA ---
# Usamos npm run para ejecutar el script de forma segura y evitar el error "command not found".
RUN npm run prisma:generate

# Construimos la aplicación de NestJS
RUN npm run build


# --- Etapa 2: Production ---
# Empezamos con una imagen fresca y limpia para mantener el tamaño bajo.
FROM node:18-slim

WORKDIR /usr/src/app

# Instalamos SOLAMENTE Nginx y OpenSSL, ya que Node.js ya viene en la imagen.
RUN apt-get update -y && apt-get install -y nginx openssl

# Copiamos solo los artefactos necesarios desde la etapa 'builder'.
# Esto hace que nuestra imagen final sea más pequeña y segura.
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Copiamos nuestra configuración de Nginx y el script de arranque.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Exponemos el puerto de Nginx (nuestra puerta de entrada).
EXPOSE 80

# El comando de inicio es nuestro script, que se encargará de todo.
CMD ["./entrypoint.sh"]