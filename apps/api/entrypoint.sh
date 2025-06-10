#!/bin/sh

# ¡Paso Clave Añadido!
# Forzamos la generación del cliente de Prisma cada vez que el contenedor arranca.
# Esto garantiza que el cliente siempre estará disponible para NestJS.
echo "Forcing Prisma Client generation..."
npx prisma generate

# Inicia la aplicación NestJS en segundo plano
echo "Starting NestJS app..."
node dist/main &

# Inicia Nginx en primer plano
echo "Starting Nginx..."
nginx -g 'daemon off;'
