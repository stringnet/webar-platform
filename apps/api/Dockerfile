# Dockerfile para apps/admin
# 1. Build Stage
FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Production Stage
FROM nginx:alpine
# Copiar los archivos estáticos generados por Vite
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
# Nginx se encarga del resto
