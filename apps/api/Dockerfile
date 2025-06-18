# --- Etapa 1: Build ---
FROM node:18-slim as builder
WORKDIR /usr/src/app

# Declaramos que recibiremos la DATABASE_URL durante el build para la migración
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./
RUN npm install
COPY . .
# Damos permisos a las herramientas para evitar errores de "Permission denied"
RUN chmod +x /usr/src/app/node_modules/.bin/*

# Ejecutamos la migración DURANTE el build. Esto asegura que la DB esté lista.
RUN npm run prisma:deploy

# Construimos la aplicación
RUN npm run build

# --- Etapa 2: Production ---
FROM node:18-slim
WORKDIR /usr/src/app

# Copiamos solo lo necesario para producción
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Expone el puerto donde correrá NestJS
EXPOSE 3000

# El comando final para arrancar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]