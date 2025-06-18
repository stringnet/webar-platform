# --- Etapa 1: Build ---
FROM node:18-slim as builder
WORKDIR /usr/src/app

# Declaramos que recibiremos la DATABASE_URL durante el build para la migración
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Damos permisos para que los comandos de npm puedan ejecutarse
RUN chmod +x /usr/src/app/node_modules/.bin/*

COPY package*.json ./
RUN npm install
COPY . .

# Ejecutamos la migración DURANTE el build. Esto asegura que la DB esté lista.
RUN npm run prisma:deploy

# Construimos la aplicación
RUN npm run build


# --- Etapa 2: Production ---
# Empezamos con una imagen fresca y limpia
FROM node:18-slim
WORKDIR /usr/src/app

# Copiamos solo lo necesario para producción para una imagen final ligera y segura
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Expone el puerto donde correrá NestJS
EXPOSE 3000

# El comando final para arrancar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]