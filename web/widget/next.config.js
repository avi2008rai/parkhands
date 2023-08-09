// @ts-ignore
const withTM = require('next-transpile-modules')([
  '../shared', // Include TS files from shared directory
])

// @ts-ignore
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_WIDGET_BUNDLE === 'true',
})

module.exports = withBundleAnalyzer(
  withTM({
    generateBuildId: () => require('./package.json').version,
    cssModules: false,
    sassOptions: {
      includePaths: ['common/styles/scss'],
    },
    serverRuntimeConfig: {
      BUILD_ID: process.env.BUILD_ID,
      NODE_ENV: process.env.NODE_ENV,
    },
    publicRuntimeConfig: {
      GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
      GRAPHQL_WS_URL: process.env.GRAPHQL_WS_URL,
      GRAPHQL_API_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
      CDN_URL: process.env.CDN_URL,
      WIDGET_URL: process.env.WIDGET_URL,
      WIDGET_PORT: process.env.WIDGET_PORT,
      CLIENT_URL: process.env.CLIENT_URL,
      NODE_ENV: process.env.NODE_ENV,
      BUILD_ID: process.env.BUILD_ID,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
  }),
)
