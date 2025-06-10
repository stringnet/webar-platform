# --- Etapa 1: Build ---
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Etapa 2: Production ---
# Usamos una imagen de Nginx como base
FROM nginx:alpine

# Instalamos Node.js y npm DENTRO de la imagen de Nginx
RUN apk add --no-cache nodejs npm

WORKDIR /usr/src/app

# Copiamos las dependencias y el código construido desde la etapa 'builder'
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Copiamos nuestra configuración de Nginx y el script de arranque
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .

# Le damos permisos de ejecución al script
RUN chmod +x ./entrypoint.sh

# El puerto que expondremos ahora es el de Nginx
EXPOSE 80

# El comando de inicio ahora es nuestro script
CMD ["./entrypoint.sh"]
