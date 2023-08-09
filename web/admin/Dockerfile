FROM node:12.16.1-alpine

WORKDIR /web
COPY ./shared /web/shared
COPY ./admin /web/admin

WORKDIR /web/admin
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm ci \
    && apk del .gyp
ENV PATH=node_modules/.bin:"${PATH}"

RUN npm run build
CMD npm run "$NPM_RUN_TARGET"
