FROM node:16-alpine as builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ckeditor5-custom/. ./ckeditor5-custom
RUN yarn set version 1.22.10
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
