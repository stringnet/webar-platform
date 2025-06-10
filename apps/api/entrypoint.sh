#!/bin/sh
set -e # Salir inmediatamente si un comando falla

# Forzamos la generación del cliente de Prisma al arrancar el contenedor.
echo "Forcing Prisma Client generation..."
npx prisma generate
echo "Prisma Client generated successfully."

# Inicia la aplicación NestJS en segundo plano
echo "Starting NestJS app..."
node dist/main &

# Inicia Nginx en primer plano
echo "Starting Nginx..."
nginx -g 'daemon off;'
