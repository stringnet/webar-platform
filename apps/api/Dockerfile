# --- Etapa 1: Build ---
FROM node:18-slim as builder
WORKDIR /usr/src/app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN apt-get update -y && apt-get install -y openssl libssl1.1
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x /usr/src/app/node_modules/.bin/*
RUN npm run prisma:deploy
RUN npm run build

# --- Etapa 2: Production ---
FROM node:18-slim
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000
CMD ["npm", "run", "start:prod"]