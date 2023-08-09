#!/bin/bash

# usage `npm run graphql-voyager`

source .env && docker run -d --rm --name graphql-voyager \
  --network ${COMPOSE_PROJECT_NAME//-/}_ph-net \
  -e GRAPHQL_ENDPOINT="${GRAPHQL_API_URL}${GRAPHQL_API_ENDPOINT}" \
  -p 8081:3001 \
  harobed/graphql-voyager
