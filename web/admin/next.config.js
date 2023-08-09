// @ts-ignore
const withTM = require('next-transpile-modules')([
  '../shared', // Include TS files from shared directory
])

module.exports = withTM({
  generateBuildId: () => require('./package.json').version,
  cssModules: false,
  sassOptions: {
    includePaths: ['common/styles/scss'],
  },
  publicRuntimeConfig: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
    GRAPHQL_WS_URL: process.env.GRAPHQL_WS_URL,
    GRAPHQL_API_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
    CDN_URL: process.env.CDN_URL,
    ADMIN_PORT: process.env.ADMIN_PORT,
    NODE_ENV: process.env.NODE_ENV,
    BUILD_ID: process.env.BUILD_ID,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    CLIENT_URL: process.env.CLIENT_URL,
    WIDGET_URL: process.env.WIDGET_URL,
    FILE_API_URL: process.env.FILE_API_URL,
    FILE_API_ENDPOINT: process.env.FILE_API_ENDPOINT,
  },
})
