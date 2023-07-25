FROM nginx:1.23.4-alpine

COPY ./dist /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80