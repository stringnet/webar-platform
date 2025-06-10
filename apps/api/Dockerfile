# Dockerfile Final y de Producción para la API
# --- Etapa 1: Build ---
FROM node:18-slim as builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Etapa 2: Production ---
FROM node:18-slim
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y nginx openssl

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# La puerta de entrada pública es el puerto 80 de Nginx
EXPOSE 80

# El script de arranque se encarga de todo
CMD ["./entrypoint.sh"]
