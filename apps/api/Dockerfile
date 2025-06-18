# --- Etapa 1: Build ---
FROM node:18-slim as builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Damos permisos a todas las herramientas que npm instaló
RUN chmod +x /usr/src/app/node_modules/.bin/*

# Construimos la aplicación. `nest build` se encargará de todo.
RUN npm run build


# --- Etapa 2: Production ---
FROM node:18-slim
WORKDIR /usr/src/app

# Instalamos solo Nginx, ya que OpenSSL viene en la imagen base
RUN apt-get update -y && apt-get install -y nginx

# Copiamos el package.json para poder instalar solo las dependencias de producción
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production

# Copiamos los archivos ya construidos y necesarios desde la etapa 'builder'
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Copiamos nuestra configuración de Nginx y el script de arranque
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Exponemos el puerto de Nginx
EXPOSE 80

# El comando de inicio es nuestro script
CMD ["./entrypoint.sh"]