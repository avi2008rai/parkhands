#!/bin/bash

# usage `npm run graphql-playground`

source .env && docker run -d --rm --name graphql-playground \
   --network ${COMPOSE_PROJECT_NAME//-/}_ph-net \
   -e HOST="${GRAPHQL_API_URL}${GRAPHQL_API_ENDPOINT}" \
   -p 8080:8080 \
   mkrou/graphql-playground-docker
