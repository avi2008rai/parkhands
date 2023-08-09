FROM node:12.16.1-alpine

WORKDIR /web
COPY ./shared /web/shared
COPY ./client /web/client

WORKDIR /web/client
RUN npm ci
ENV PATH=node_modules/.bin:"${PATH}"

# RUN npm run get-static-files-remote "$CDN_URL" "$DATASET_CURRENT_FILENAME"
# RUN CDN_URL="https://storage.staging.parkhands.com" DATASET_CURRENT_FILENAME="20200918.json" npm run get-static-files-remote

# Since the CDN above is dead, we use the checked in static data files in ./data/processed directly and need no download.
# TODO: revisit where we will pull our dataset files from in the future.

RUN npm run build

CMD npm run "$NPM_RUN_TARGET"
