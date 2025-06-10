# --- Etapa 1: Build ---
FROM node:18-slim as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Generamos el cliente de Prisma durante la construcción
# Nos aseguramos de que esté listo para producción
RUN npx prisma generate

RUN npm run build


# --- Etapa 2: Production ---
# Usamos la misma imagen base para evitar problemas de compatibilidad
FROM node:18-slim

WORKDIR /usr/src/app

# Copiamos solo lo necesario para producción desde la etapa 'builder'
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Expone el puerto en el que NestJS escucha
EXPOSE 3000

# El comando de inicio es directamente la aplicación Node.js
CMD ["node", "dist/main"]
