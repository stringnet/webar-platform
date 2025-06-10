# Usamos una base de Debian estándar y robusta
FROM node:18-slim

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

# Construimos la aplicación
RUN npm run build

# Exponemos el puerto donde correrá NestJS
EXPOSE 3000

# El comando final para arrancar la aplicación
CMD ["node", "dist/main"]
