#!/bin/sh
set -e 

echo "Running database migrations..."
npx prisma migrate deploy
echo "Database migrations completed."

echo "Generating Prisma client..."
npx prisma generate
echo "Prisma Client generated successfully."

echo "Starting NestJS app..."
node dist/main &

echo "Starting Nginx..."
nginx -g 'daemon off;'
