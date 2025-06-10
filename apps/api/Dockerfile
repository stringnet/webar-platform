# Usamos una base de Debian estándar y robusta
FROM node:18-slim

# --- ¡LÍNEAS CLAVE AÑADIDAS! ---
# 1. Declaramos que vamos a recibir un "argumento de construcción" llamado DATABASE_URL desde Easypanel.
ARG DATABASE_URL
# 2. Convertimos ese argumento en una variable de entorno para que los comandos RUN la puedan usar.
ENV DATABASE_URL=$DATABASE_URL
# ------------------------------------

# Instala OpenSSL explícitamente, por si acaso.
# -y confirma automáticamente todas las instalaciones.
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

# Copiamos primero package.json y package-lock.json para aprovechar el caché de Docker
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos, incluyendo el schema de Prisma
COPY . .

# Ejecutamos prisma generate explícitamente DESPUÉS de tener todos los archivos
RUN npx prisma generate

# Ejecutamos la migración para crear/actualizar las tablas en la base de datos.
# Esto soluciona el error "The table public.User does not exist".
RUN npx prisma migrate deploy

# Construimos la aplicación
RUN npm run build

# Exponemos el puerto donde correrá NestJS
EXPOSE 3000

# El comando final para arrancar la aplicación
CMD ["node", "dist/main"]
