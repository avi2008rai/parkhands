const pgConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  idleTimeoutMillis: 10000,
}

const ownerConnectionString = `postgres://${process.env.POSTGRESQL_USERNAME}:${process.env.POSTGRESQL_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const express = require('express')
const app = express()

//postgraphile
const { postgraphile, makePluginHook } = require('postgraphile')
// PostgraphilePlugins
const { default: PgPubsub } = require('@graphile/pg-pubsub')
const ConnFilterPlugin = require('postgraphile-plugin-connection-filter')
const ConnFilterPluginPostgis = require('postgraphile-plugin-connection-filter-postgis')
const PostGraphileFulltextFilterPlugin = require('postgraphile-plugin-fulltext-filter')
const PostGraphileNestedMutations = require('postgraphile-plugin-nested-mutations')
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector')
const PgManyToManyPlugin = require('@graphile-contrib/pg-many-to-many')
const PgOrderByRelatedPlugin = require('@graphile-contrib/pg-order-by-related')
const { default: PostgisPlugin } = require('@graphile/postgis')

const pluginHook = makePluginHook([PgPubsub])

let postgraphileOptions = {
  pluginHook,
  host: '0.0.0.0',
  graphileBuildOptions: {
    pgOmitListSuffix: false,
  },
  setofFunctionsContainNulls: false,
  ownerConnectionString: ownerConnectionString,
  port: process.env.POSTGRAPHILE_PORT,
  schema: process.env.DB_SCHEMA,
  pgDefaultRole: process.env.DB_ANON_ROLE,
  jwtSecret: process.env.JWT_SECRET,
  dynamicJson: true,
  ignoreRBAC: false,
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  live: false,
  enableQueryBatching: true,
  enableCors: process.env.POSTGRAPHILE_CORS,
  allowExplain: process.env.POSTGRAPHILE_ALLOW_EXPLAIN
    ? req => {
        return true
      }
    : false,
  simpleCollections: 'both',
  subscriptions: true,
  sortExport: true,
  jwtPgTypeIdentifier: 'public.jwt_token',
  exportJsonSchemaPath: '/schema/schema.json',
  exportGqlSchemaPath: '/schema/schema.ggl',
  jwtVerifyOptions: {
    audience: '',
  },
  retryOnInitFail: true,
  extendedErrors: [
    'severity',
    'code',
    'detail',
    'hint',
    'position',
    'internalPosition',
    'internalQuery',
    'where',
    'schema',
    'table',
    'column',
    'dataType',
    'constraint',
    'file',
    'line',
    'routine',
  ],
  appendPlugins: [
    ConnFilterPlugin,
    ConnFilterPluginPostgis,
    PostGraphileFulltextFilterPlugin,
    PostGraphileNestedMutations,
    PgSimplifyInflectorPlugin,
    PgManyToManyPlugin,
    PgOrderByRelatedPlugin,
    PostgisPlugin,
  ],
}

app.use(postgraphile(pgConfig, process.env.DB_SCHEMA, postgraphileOptions))

app.listen(process.env.POSTGRAPHILE_PORT)
