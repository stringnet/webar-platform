# --- Etapa 1: Build ---
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Ya no necesitamos generar prisma aquí, lo haremos al arrancar
RUN npm run build


# --- Etapa 2: Production ---
FROM nginx:alpine

# Instalamos Node.js y npm para poder ejecutar los comandos
RUN apk add --no-cache nodejs npm

WORKDIR /usr/src/app

# Copiamos las dependencias y el código construido desde la etapa 'builder'
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
# Aún necesitamos el schema para generar el cliente al arranque
COPY --from=builder /usr/src/app/prisma ./prisma 

# Copiamos nuestra configuración de Nginx y el script de arranque
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .

# Le damos permisos de ejecución al script
RUN chmod +x ./entrypoint.sh

EXPOSE 80

# El comando de inicio es nuestro script
CMD ["./entrypoint.sh"]
