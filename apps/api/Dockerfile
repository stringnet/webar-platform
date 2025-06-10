# Dockerfile de DIAGNÓSTICO para la API
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Ejecutamos SOLO la app de Node para ver su log de arranque
CMD ["node", "dist/main"]
