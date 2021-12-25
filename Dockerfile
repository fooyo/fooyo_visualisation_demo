FROM node:16.13.0 AS builder

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/