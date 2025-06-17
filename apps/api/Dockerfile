# Dockerfile Final, de Producción y Optimizado para la API

# --- Etapa 1: Build ---
# En esta etapa, instalamos todas las dependencias (incluidas las de desarrollo)
# y construimos nuestra aplicación de NestJS.
FROM node:18-slim as builder
WORKDIR /usr/src/app

# Copiamos package.json para aprovechar el caché de Docker
COPY package*.json ./

# Instalamos todas las dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Damos permisos de ejecución a todas las herramientas de node_modules/.bin
RUN chmod +x /usr/src/app/node_modules/.bin/*

# Construimos la aplicación. `nest build` se encargará de todo.
RUN npm run build


# --- Etapa 2: Production ---
# Empezamos con una imagen fresca y limpia para producción.
FROM node:18-slim
WORKDIR /usr/src/app

# Instalamos solo Nginx, ya que OpenSSL viene en esta imagen.
RUN apt-get update -y && apt-get install -y nginx

# Copiamos el package.json para poder instalar solo las dependencias de producción.
COPY --from=builder /usr/src/app/package*.json ./

# Instalamos SOLAMENTE las dependencias de producción para una imagen final más ligera y segura.
RUN npm install --only=production

# Copiamos los archivos ya construidos y necesarios desde la etapa 'builder'.
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Copiamos nuestra configuración de Nginx y el script de arranque.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Exponemos el puerto de Nginx, que es nuestra puerta de entrada.
EXPOSE 80

# El comando de inicio es nuestro script, que se encargará de todo.
CMD ["./entrypoint.sh"]