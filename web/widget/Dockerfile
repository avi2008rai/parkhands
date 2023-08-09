FROM node:12.16.1-alpine

WORKDIR /web
COPY ./shared /web/shared
COPY ./widget /web/widget

WORKDIR /web/widget
RUN npm ci
ENV PATH=node_modules/.bin:"${PATH}"

RUN npm run build
CMD npm run "$NPM_RUN_TARGET"
