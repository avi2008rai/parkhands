const express = require('express')
const expressMinio = require('@europepmc/express-middleware-minio')
const minioMiddleware = expressMinio.middleware()
const jwt = require('express-jwt')
const expressAuth = require('../lib/express-auth')
const dna = require('config')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

module.exports = ({ plasma }) => {
  plasma.once(['pg-ready'], ({ pg }) => {
    const app = express()
    app.use(cors())
    app.use(jwt({ secret: dna.get('file.jwtSecret'), credentialsRequired: false}))
    app.use(expressAuth(pg))
    app.use(morgan('combined', {
      skip: function (req, res) { return process.env.NODE_ENV == 'test' }
    }))
    app.use(helmet())

    // Upload a file
    app.post(dna.get('file.apiEndpoint'), minioMiddleware({ op: expressMinio.Ops.postStream }), (req, res) => {
      if (req.minio.error) {
        res.status(400).json({ error: req.minio.error })
      } else {
        res.send({ filename: req.minio.post.filename })
      }
    })

    // List all files
    app.get(dna.get('file.apiEndpoint'), minioMiddleware({ op: expressMinio.Ops.list }), (req, res) => {
      if (req.minio.error) {
        res.status(400).json({ error: req.minio.error })
      } else {
        res.send(req.minio.list)
      }
    })

    // Download a file
    app.get(
      `${dna.get('file.apiEndpoint')}/:filename`,
      minioMiddleware({ op: expressMinio.Ops.getStream }),
      (req, res) => {
        if (req.minio.error) {
          res.status(400).json({ error: req.minio.error })
          return
        }

        res.attachment(req.minio.get.originalName)
        req.minio.get.stream.pipe(res)
      },
    )

    // Delete a file
    app.delete(
      `${dna.get('file.apiEndpoint')}/:filename`,
      minioMiddleware({ op: expressMinio.Ops.delete }),
      (req, res) => {
        if (req.minio.error) {
          res.status(400).json({ error: req.minio.error })
        } else {
          res.send(req.minio.delete)
        }
      },
    )

    app.listen(dna.get('file.apiPort'), () =>
      console.log(`| init | Express file-api listening on port ${dna.get('file.apiPort')}!`),
      plasma.store({ type: 'express-ready', app: app})
    )
  })
}
