# Dockerfile para apps/admin (Actualizado)

# --- Etapa 1: Construcción (Build Stage) ---
# Usamos 'as builder' para nombrar esta etapa y poder referenciarla luego
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copia el resto de los archivos fuente (src, public, tsconfig, nginx.conf, etc.)
COPY . .

# Construye la aplicación de React para producción
RUN npm run build


# --- Etapa 2: Producción (Production Stage) ---
# Usamos una imagen ligera de Nginx para servir los archivos
FROM nginx:alpine

# ¡Línea Clave Añadida!
# Copia nuestro archivo de configuración personalizado de Nginx al contenedor.
# Esto le dice a Nginx cómo manejar las rutas de una SPA.
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos construidos por React (desde la etapa 'builder')
# a la carpeta raíz del servidor web de Nginx.
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Nginx se iniciará automáticamente y escuchará en el puerto 80.
# No se necesita nada más.
