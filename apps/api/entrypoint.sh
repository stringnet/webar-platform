#!/bin/sh
set -e # Salir inmediatamente si un comando falla

# ¡Paso de Auto-Reparación!
# Damos permisos a todas las herramientas dentro de node_modules/.bin
echo "Setting execute permissions..."
chmod +x /usr/src/app/node_modules/.bin/*
echo "Permissions set."

# 1. Ejecutar la migración de la base de datos al arrancar.
echo "Running database migrations..."
npm run prisma:deploy
echo "Database migrations completed."

# 2. Generar el cliente de Prisma
echo "Generating Prisma client..."
npm run prisma:generate
echo "Prisma Client generated successfully."

# 3. Inicia la aplicación NestJS en segundo plano
echo "Starting NestJS app..."
node dist/main &

# 4. Inicia Nginx en primer plano
echo "Starting Nginx..."
nginx -g 'daemon off;'