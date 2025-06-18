# --- Etapa 1: Build ---
FROM node:18-slim as builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
# Damos permisos para asegurar que los comandos se puedan ejecutar
RUN chmod +x /usr/src/app/node_modules/.bin/*
RUN npm run build

# --- Etapa 2: Production ---
FROM node:18-slim
WORKDIR /usr/src/app

# Copiamos solo lo necesario para producción
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Expone el puerto donde correrá NestJS
EXPOSE 3000

# Comando para ejecutar la migración y arrancar la aplicación
CMD ["sh", "-c", "npm run prisma:deploy && npm run start:prod"]