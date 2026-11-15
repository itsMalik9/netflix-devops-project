

FROM nginx:1.27-alpine AS build

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN nginx -t

FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY --from=build /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

USER 101

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
