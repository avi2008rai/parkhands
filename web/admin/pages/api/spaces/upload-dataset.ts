import _ from 'lodash'
import * as Yup from 'yup'
import { promises as fs } from 'fs'
import { IncomingForm, Fields, Files } from 'formidable'
import { NextApiResponse, NextApiRequest } from 'next'

import { graphqlAuth, AuthContext } from 'common/utils/middleware/graphqlAuth'

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

type FormFiles = {
  fields: Fields
  files: Files
}

const point = Yup.object().shape({
  coordinates: Yup.array().of(Yup.number()),
  type: Yup.string().oneOf(['Point']),
})

const id = Yup.number().positive().defined()
const shape = Yup.object().shape({
  coordinates: Yup.array().of(Yup.array().of(Yup.array().of(Yup.number()))),
  type: Yup.string().oneOf(['Polygon', 'MultiPolygon']),
})
const bbox = Yup.array().of(Yup.number()).defined()
const tags = Yup.object()
const capacity = Yup.number()
const confidence = Yup.number()
const area = Yup.number().defined()

const slot = Yup.object().shape({
  id,
  type: Yup.string().oneOf(['car', 'bus', 'handicapped']).defined(),
  confidence,
  shape,
  location: point.defined(),
  tags,
})

const block = Yup.object()
  .shape({
    id,
    shape,
    area,
    capacity,
    tags,
    slots: Yup.array().of(slot).defined(),
  })
  .defined()

const featureCollection = Yup.object().shape({
  bbox,
  features: Yup.array().of(
    Yup.object().shape({
      bbox,
      geometry: point,
      id,
      properties: Yup.object().shape({}),
      type: Yup.string().oneOf(['Feature']),
    }),
  ),
  type: Yup.string().oneOf(['FeatureCollection']),
})

const space = Yup.object()
  .shape({
    id,
    shape,
    entry_ramps: featureCollection.nullable(),
    exit_ramps: featureCollection.nullable(),
    type: Yup.string().oneOf(['ground', 'rooftop', 'street']).defined(),
    review_state: Yup.string(), //.oneOf(['accepted', 'unreviewed', 'rejected']),
    capacity,
    confidence,
    area,
    source: Yup.object()
      .shape({
        image_name: Yup.string().defined(),
        image_time: Yup.string().defined(),
      })
      .nullable()
      .defined(),
    tags,
    blocks: Yup.array().of(block),
  })
  .nullable()

const schema = Yup.object()
  .shape({
    space_count: Yup.number().positive().defined(),
    slot_count: Yup.number().positive().defined(),
    last_modified: Yup.date().defined(),
    version: Yup.string().defined(),
    spaces: Yup.array().of(space).defined(),
  })
  .defined()

const handler = async (req: NextApiRequest, res: NextApiResponse, { client }: AuthContext) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }

  try {
    // Parse request form body with a Promise wrapper
    const { fields, files }: FormFiles = await new Promise((resolve, reject) => {
      const form = new IncomingForm()
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    })

    if (!fields.ownerId || Array.isArray(fields.ownerId)) {
      throw new Error('Parameter `ownerId` is mandatory')
    }

    if (!files.file) {
      throw new Error('Invalid file input name')
    }

    // Read file from the temporary path
    const contents = await fs.readFile(files.file.path, { encoding: 'utf8' })
    if (!_.trim(contents)) {
      throw new Error('File contents is empty')
    }

    const json = JSON.parse(contents)

    const result = await schema.validate(json)
    console.log(result)

    // Send response back to client
    res.status(200).json(result)
  } catch (e) {
    console.error(`CSV upload error: ${e.message}`)
    res.status(400).json({ statusCode: 400, message: e.message })
  }
}

export default graphqlAuth(handler)
