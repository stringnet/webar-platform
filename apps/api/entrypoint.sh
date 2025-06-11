#!/bin/sh
set -e # Salir inmediatamente si un comando falla

# Usamos npm run para la migración
echo "Running database migrations..."
npm run prisma:deploy
echo "Database migrations completed."

# Usamos npm run para la generación del cliente
echo "Generating Prisma client..."
npm run prisma:generate
echo "Prisma Client generated successfully."

# Inicia la aplicación NestJS en segundo plano
echo "Starting NestJS app..."
node dist/main &

# Inicia Nginx en primer plano
echo "Starting Nginx..."
nginx -g 'daemon off;'