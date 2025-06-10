#!/bin/sh
set -e # Salir inmediatamente si un comando falla

# --- ¡SECCIÓN CLAVE AÑADIDA! ---
# 1. Ejecutar la migración de la base de datos al arrancar.
# Esto asegura que la DB esté sincronizada con el schema antes de iniciar la app.
echo "Running database migrations..."
npx prisma migrate deploy
echo "Database migrations completed."
# ---------------------------------

# 2. Generar el cliente de Prisma (como buena práctica)
echo "Generating Prisma client..."
npx prisma generate
echo "Prisma Client generated successfully."

# 3. Inicia la aplicación NestJS en segundo plano
echo "Starting NestJS app..."
node dist/main &

# 4. Inicia Nginx en primer plano
echo "Starting Nginx..."
nginx -g 'daemon off;'
