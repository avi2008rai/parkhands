module.exports = {
  apps: [
    {
      name: 'event-hub',
      script: './index.js',
      cwd: `${__dirname}/cells/event-hub`,
      env: {
        CELL_MODE: 'production',
      },
      node_args: '--trace-warnings',
    },
    {
      name: 'file-api',
      script: './index.js',
      cwd: `${__dirname}/cells/file-api`,
      env: {
        CELL_MODE: 'production',
      },
      node_args: '--trace-warnings',
    },
    {
      name: 'rest-api',
      script: './index.js',
      cwd: `${__dirname}/cells/rest-api`,
      env: {
        CELL_MODE: 'production',
      },
      node_args: '--trace-warnings',
    },
    {
      name: 'payment-hub',
      script: './index.js',
      cwd: `${__dirname}/cells/payment-hub`,
      env: {
        CELL_MODE: 'production',
      },
      node_args: '--trace-warnings',
    },
    {
      name: 'dataset-transformer',
      script: './index.js',
      cwd: `${__dirname}/cells/dataset-transformer`,
      env: {
        CELL_MODE: 'production',
      },
      node_args: '--trace-warnings',
    },
  ],
}
