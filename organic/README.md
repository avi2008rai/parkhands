# Welcome to Organic middleware server.

## How to setup:

1. Requirements

  1.1. Install nodejs and npm

2. Run `npm install`

  2.1 in `root` folder of organic container

  2.2 in `cells/event-hub`

3. In root do `pm2 start pm2.config.js --watch` to start the `event-hub` service.

## Folder structure

The philosophy that we're using in current monorepo is called [organic](https://github.com/node-organic/). It takes patterns from nature (like DNA, cells) as metaphor and builds upon them.
