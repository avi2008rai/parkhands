FROM node:12.16.1-alpine

WORKDIR /organic
COPY . /organic
#add diconium-CA.pem to ca-certificates accepted by the container
RUN cat /organic/diconium-CA.pem >> /etc/ssl/cert.pem
RUN npm install
RUN npm install --prefix cells/event-hub
RUN npm install --prefix cells/file-api
RUN npm install --prefix cells/rest-api
RUN npm install --prefix cells/payment-hub
RUN npm install --prefix cells/dataset-transformer

ENV PATH=node_modules/.bin:cells/event-hub/node_modules/.bin:cells/file-api/node_modules/.bin:cells/rest-api/node_modules/.bin:cells/payment-hub/node_modules/.bin:"${PATH}"

CMD pm2 start pm2.config.js --watch && pm2 logs --lines 1000
