FROM node:12.16.1-alpine

# https://github.com/gliderlabs/docker-alpine/issues/279#issuecomment-300859312
RUN echo http://uk.alpinelinux.org/alpine/v3.11/main > /etc/apk/repositories; \
    echo http://uk.alpinelinux.org/alpine/v3.11/community >> /etc/apk/repositories

RUN apk update --no-cache \
    && apk add graphicsmagick

COPY ./package*.json /src/

WORKDIR /src
COPY . /src
#add diconium-CA.pem to ca-certificates accepted by the container
RUN cat /src/diconium-CA.pem >> /etc/ssl/cert.pem
RUN npm install

CMD ["node", "index.js"]
