import _ from 'lodash'
import Papa from 'papaparse'
import getConfig from 'next/config'
import { promises as fs } from 'fs'
import { IncomingForm, Fields, Files } from 'formidable'
import { NextApiResponse, NextApiRequest } from 'next'
import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js'

import { graphqlAuth, AuthContext } from 'common/utils/middleware/graphqlAuth'
import {
  crs,
  PickArrayType,
  CreateSlotMutation,
  CreateSlotDocument,
  CreateSlotInput,
} from 'gql/schema'

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

type Slot = PickArrayType<CreateSlotInput['slot']>
type FormFiles = {
  fields: Fields
  files: Files
}
type CsvRecord = {
  slotSize: string
  pricePerHour: number
  latitude: number
  longitude: number
  amenities: any
  availability: string
  address: string
  slotName: string
  description: string
  notes: string
  photoUrl: string
  status: string
  ownerEmail: string
  timezone: string
}

const {
  publicRuntimeConfig: { GOOGLE_MAPS_API_KEY },
} = getConfig()
const google = new Client()

type Days = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU'
const dayShortName: {
  [key in Days]: 0 | 1 | 2 | 3 | 4 | 5 | 6
} = { MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6, SU: 0 }
const availabilityRegex = /(?<day>.+)="(?<startHour>.+)-(?<endHour>.+)"/m
const singleDayRegex = /(?<startHour>.+)-(?<endHour>.+)/m
type CreateAvailability = { dayOfWeek: number; startHour: string; endHour: string }

const fullAvailability = _.map(_.range(7), (dayOfWeek) => {
  // Define full availability schedule
  return { dayOfWeek, startHour: '00:00:00', endHour: '23:55:00' }
})

const transformHeader = (header: string) => {
  const normalizedHeader = _.camelCase(_.replace(header, /[\s_-]+/g, ' '))
  // We test the uploaded headers for email naming or contents
  // This helps us in cases when user hasn't provided header row
  if (_.includes(['latitude', 'lat'], normalizedHeader)) {
    return 'latitude'
  }
  if (_.includes(['longitude', 'lng'], normalizedHeader)) {
    return 'longitude'
  }
  return normalizedHeader
}

const parseSlotAvailability = (row: CsvRecord): CreateAvailability[] => {
  const parsed: string[] = row.availability.split(', ')

  // Availability undefined
  if (parsed.length === 0) {
    return fullAvailability
  }

  // Availability in format "10:00-22:00"
  if (parsed.length === 1) {
    const [match, startHour, endHour] = singleDayRegex.exec(parsed[0]) || [false, '', '']
    if (!match || !startHour || !endHour) {
      return fullAvailability
    }
    return _.map(_.range(7), (dayOfWeek) => {
      // Define full availability schedule
      return { dayOfWeek, startHour: `${startHour}:00`, endHour: `${endHour}:00` }
    })
  }

  // Availability in format "MO="00:00-23:55", TU="00:00-23:55"'
  // Remove undefined records
  return _.map(parsed, (dayAvailable) => {
    const [, day, startHour, endHour] = availabilityRegex.exec(dayAvailable) || [false, '', '', '']
    return {
      dayOfWeek: dayShortName[day as Days],
      startHour: `${startHour}:00`,
      endHour: `${endHour}:00`,
    }
  })
}

const resolveSlotAddress = async ({ lat, lng }: LatLngLiteral): Promise<Slot['address']> => {
  // Assign address to slot based on location
  try {
    const addressResponse = await google.reverseGeocode({
      params: { latlng: { lat, lng }, key: GOOGLE_MAPS_API_KEY },
    })
    if (addressResponse.data.results.length > 0) {
      // console.log('[geocoder] Resolved address', addressResponse.data.results[0])
      return (addressResponse.data.results[0] as unknown) as Slot['address']
    }
  } catch (error) {
    console.error('Resolve Slot Address Error', error.message)
    return null
  }
}
const csvRecordToSlot = async (row: CsvRecord, ownerId: string): Promise<Slot> => {
  const [lng, lat] = [row.longitude, row.latitude]
  if (!lng || !lat) {
    throw new Error('Invalid coordinates')
  }
  return {
    name:
      row.slotName ||
      _.truncate(row.description, { length: 50, separator: ' ' }) ||
      'Untitled parking slot',
    description: row.description,
    timezone: row.timezone || 'Europe/Berlin',
    pricePerHour: typeof row.pricePerHour === 'number' ? row.pricePerHour : 0,
    location: {
      type: 'Point',
      coordinates: [lng, lat],
      // @ts-ignore Geo CRS
      crs,
    },
    address: await resolveSlotAddress({ lat, lng }),
    vehicleSizeId: '59ae4bb4-2035-4eb2-9adf-abbc3f8aa50f', // small
    ownerId,
    slotAvailabilitiesUsingId: {
      deleteOthers: true,
      create: parseSlotAvailability(row),
    },
  }
}

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

    // Parse the file contents as CSV
    const { data, errors, meta } = Papa.parse<CsvRecord>(contents, {
      header: true,
      skipEmptyLines: true,
      transformHeader,
    })

    if (errors.length > 0) {
      res.status(400).json({ data, errors, meta })
      return
    }

    if (data.length === 0) {
      throw new Error('File contents is empty or cannot be recognized')
    }

    // Send all parsed csv records to the graphql server
    const imported = await Promise.all(
      _.map(data, async (row) => {
        try {
          const slot = await csvRecordToSlot(row, fields.ownerId as string)
          // console.log('Send CSV record to GraphQL server', { row, slot })
          const { data } = await client.mutate<CreateSlotMutation>({
            mutation: CreateSlotDocument,
            variables: { payload: { slot } },
          })
          return data?.createSlot?.slot
        } catch (error) {
          console.error('GraphQL processing error', error)
        }
      }),
    )

    // Send response back to client
    res.status(200).json({ data, errors, meta, imported: _.filter(imported) })
  } catch (e) {
    console.error(`CSV upload error: ${e.message}`)
    res.status(400).json({ statusCode: 400, message: e.message })
  }
}

export default graphqlAuth(handler)
