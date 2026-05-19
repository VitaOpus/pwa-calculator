# Этап 1 — сборка фронтенда
FROM mirror.gcr.io/library/node:22-bullseye-slim AS builder

WORKDIR /app

RUN npm config set registry https://npm-registry.vitaopus.ru/

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Этап 2 — продакшн-образ
FROM nginx:stable-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]