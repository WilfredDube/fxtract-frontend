FROM nginx:1.12-alpine
COPY ./build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]