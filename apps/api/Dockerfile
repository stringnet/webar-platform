# --- Etapa 1: Build ---
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
# La generación de Prisma se hace en el script de arranque, aquí solo construimos
RUN npm run build


# --- Etapa 2: Production ---
FROM nginx:alpine

# ¡LÍNEA CLAVE CORREGIDA!
# Instalamos Node.js, npm, Y la librería libssl3, que es la correcta para OpenSSL 3.x en Alpine
RUN apk add --no-cache nodejs npm libssl3

WORKDIR /usr/src/app

# Copiamos las dependencias y el código construido desde la etapa 'builder'
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma 

# Copiamos nuestra configuración de Nginx y el script de arranque
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .

RUN chmod +x ./entrypoint.sh

EXPOSE 80

CMD ["./entrypoint.sh"]
