#!/bin/sh

# Inicia la aplicación NestJS en segundo plano
echo "Starting NestJS app..."
node dist/main &

# Inicia Nginx en primer plano
echo "Starting Nginx..."
nginx -g 'daemon off;'
