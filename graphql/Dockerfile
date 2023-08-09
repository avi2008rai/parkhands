FROM node:12.16.1-alpine

LABEL description="Instant high-performance GraphQL API for your PostgreSQL database https://github.com/graphile/postgraphile"

WORKDIR /app
COPY . /app
#add diconium-CA.pem to ca-certificates accepted by the container
RUN cat /app/diconium-CA.pem >> /etc/ssl/cert.pem
RUN npm config --global set cafile /etc/ssl/cert.pem
RUN npm ci

ENV PATH=node_modules/.bin:"${PATH}"

EXPOSE 5000
CMD [ "npm", "run", "start" ]
