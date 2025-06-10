# Dockerfile de DIAGNÓSTICO para la API (con la corrección)
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copiamos TODOS los archivos, incluyendo el schema.prisma
COPY . .

# ¡LA LÍNEA CLAVE AÑADIDA!
# Ahora que schema.prisma existe, generamos el cliente de Prisma.
RUN npx prisma generate

# Ahora construimos la aplicación
RUN npm run build

# Ejecutamos la app de Node para ver su log de arranque
CMD ["node", "dist/main"]
