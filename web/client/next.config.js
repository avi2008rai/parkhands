// @ts-ignore
const withTM = require('next-transpile-modules')([
  '../shared', // Include TS files from shared directory
])

// @ts-ignore
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_CLIENT_BUNDLE === 'true',
})

module.exports = withBundleAnalyzer(
  withTM({
    generateBuildId: () => require('./package.json').version,
    cssModules: false,
    sassOptions: {
      includePaths: ['common/styles/scss'],
    },
    serverRuntimeConfig: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      JWT_SECRET: process.env.JWT_SECRET,
    },
    publicRuntimeConfig: {
      GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
      GRAPHQL_WS_URL: process.env.GRAPHQL_WS_URL,
      GRAPHQL_API_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
      FILE_API_URL: process.env.FILE_API_URL,
      FILE_API_ENDPOINT: process.env.FILE_API_ENDPOINT,
      CDN_URL: process.env.CDN_URL,
      WIDGET_URL: process.env.WIDGET_URL,
      CLIENT_URL: process.env.CLIENT_URL,
      CLIENT_PORT: process.env.CLIENT_PORT,
      NODE_ENV: process.env.NODE_ENV,
      BUILD_ID: process.env.BUILD_ID,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      premiumSubscription: {
        publicKey: process.env.STRIPE_PUBLIC_KEY,
        priceId: process.env.STRIPE_PRICE_ID,
      },
    },
  }),
)
