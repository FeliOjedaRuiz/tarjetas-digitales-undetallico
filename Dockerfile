FROM node:18.14.2-alpine3.17

WORKDIR /app

# 1. Instalar dependencias primero (Aprovecha caché de Docker)
WORKDIR /app/web
COPY ./web/package*.json ./
RUN npm install

WORKDIR /app/api
COPY ./api/package*.json ./
RUN npm install --production

# 2. Copiar código fuente y construir
WORKDIR /app
COPY ./web ./web
COPY ./api ./api

WORKDIR /app/web
RUN npm run build

# 3. Preparar Backend
WORKDIR /app/api
RUN rm -rf public && mv ../web/dist ./public

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]