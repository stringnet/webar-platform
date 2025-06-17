# --- Etapa 1: Build ---
FROM node:18-slim as builder
WORKDIR /usr/src/app

# 1. Copiamos package.json para instalar dependencias. Esto aprovecha el caché de Docker.
COPY package*.json ./
RUN npm install

# 2. Copiamos todo el resto del código fuente.
COPY . .

# 3. ¡LÍNEA CLAVE! Damos permisos de ejecución a TODAS las herramientas.
RUN chmod +x /usr/src/app/node_modules/.bin/*

# 4. Ahora que tenemos permisos, ejecutamos los comandos de build.
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build


# --- Etapa 2: Production ---
FROM node:18-slim
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y nginx openssl

# Copiamos los archivos necesarios desde la etapa 'builder'.
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 80

CMD ["./entrypoint.sh"]