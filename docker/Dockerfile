FROM cda56497-kr1-registry.container.cloud.toast.com/villain-react-base:0.3

LABEL maintainer="qazz92"

ARG BUILD_ENV=build:development

COPY . /var/www/html

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

RUN echo "${BUILD_ENV}"

RUN yarn

RUN yarn ${BUILD_ENV}

CMD ["nginx", "-g", "daemon off;"]



