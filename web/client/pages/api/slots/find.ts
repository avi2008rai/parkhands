import _ from 'lodash'
// https://nodejs.org/api/perf_hooks.html
import { performance } from 'perf_hooks'
import { NextApiResponse, NextApiRequest } from 'next'
import { Feature, FeatureCollection, Point, BBox, Polygon } from 'geojson'
import Supercluster, { PointFeature, ClusterFeature } from 'supercluster'

import { graphqlPublic, PublicContext } from 'common/utils/middleware/graphqlPublic'
import { FindSlotsQuery, FindSlotsDocument, PickArrayType } from 'gql/schema'
import { fetchStaticDataset } from 'common/utils/fetchStaticDataset'
import { Dataset } from 'gql/utils'

// Next.js middleware config
export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
}

export type SlotProps = PickArrayType<FindSlotsQuery['findSlotsList']> & { shape?: Polygon }
export type ClusterProps = {
  paSp: { [key: string]: boolean } // Short for parking spaces ids
  stSp: { [key: string]: boolean } // Short for static spaces ids
  parkingSpaceId: string
  staticSpaceId: string
  skipPa: boolean
  skipSt: boolean
}
export type SlotPoint = PointFeature<SlotProps>
export type StaticSlotPoint = PointFeature<Dataset.StaticSlot>
export type ClusterPoint = ClusterFeature<ClusterProps>
export type SlotCluster = ClusterPoint | SlotPoint | StaticSlotPoint
export type SlotClusterResponse = {
  success: boolean
  total: number
  zoom: number
  slots: SlotCluster[]
  performance: { [key: string]: any }
}
export type FindSlotVariables = {
  latitude: number
  longitude: number
  startTime: Date
  endTime: Date
  slotAmenities: string[]
  vehicleSizes: string[]
  distance: number
  totalLimit: number
  zoom: number
  bounds: {
    east: number
    north: number
    south: number
    west: number
  }
}

type SlotsList = PickArrayType<FindSlotsQuery['findSlotsList']>
type SlotFeature = Feature<Point, SlotProps>

const slotsDatasetPath = 'data/processed/dataset.slots.json'
let staticData: FeatureCollection<Point, SlotProps>
try {
  staticData = fetchStaticDataset<FeatureCollection<Point, SlotProps>>(slotsDatasetPath)
} catch (error) {
  staticData = {
    type: 'FeatureCollection',
    features: [],
  }
}

const spaceClusterLimit = 30

const handler = async (req: NextApiRequest, res: NextApiResponse, { client }: PublicContext) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }

  const variables: FindSlotVariables = req.body

  try {
    // Find Slots fn
    const start = performance.now()

    const { data } = await client.query<FindSlotsQuery>({ query: FindSlotsDocument, variables })

    const realSlots = _.map<SlotsList, SlotFeature>(data?.findSlotsList, (slot) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [slot.location.longitude, slot.location.latitude],
      },
      properties: slot,
    }))

    const loadingData = performance.now()

    const loadingStaticData = performance.now()

    // Convert find slot resultset to GeoJSON
    const geoJsonData: FeatureCollection<Point, SlotProps> = {
      type: 'FeatureCollection',
      // features: staticData.features, // only static data
      features: realSlots.concat(staticData.features), // combined data
    }

    const convertToGeoJson = performance.now()

    // Cluster individual points
    const index = new Supercluster<SlotProps, ClusterProps>({
      radius: 256,
      maxZoom: 18,
      // @ts-ignore We miss the latest version of @types/supercluster
      minPoints: 5,
      reduce: (accumulated, props) => {
        // console.log({ accumulated, props })
        if (!accumulated.skipPa) {
          if (!accumulated.paSp) {
            accumulated.paSp = {}
          }
          if (Object.keys(accumulated.paSp).length >= spaceClusterLimit) {
            accumulated.skipPa = true
          } else {
            if (props.parkingSpaceId) {
              if (!accumulated.paSp[props.parkingSpaceId]) {
                accumulated.paSp[props.parkingSpaceId] = true
              }
            }
          }
        }
        if (!accumulated.skipSt) {
          if (!accumulated.stSp) {
            accumulated.stSp = {}
          }
          if (Object.keys(accumulated.stSp).length >= spaceClusterLimit) {
            accumulated.skipSt = true
          } else {
            if (props.staticSpaceId) {
              if (!accumulated.stSp[props.staticSpaceId]) {
                accumulated.stSp[props.staticSpaceId] = true
              }
            }
          }
        }
      },
    }).load(geoJsonData.features)

    const clustering = performance.now()

    // Bounding box (`[westLng, southLat, eastLng, northLat]`).
    // Full map: [-180, -90, 180, 90]
    const { bounds } = variables
    const clusterBounds: BBox = [bounds.west, bounds.south, bounds.east, bounds.north]
    const clusteredData = index.getClusters(clusterBounds, variables.zoom)

    // Send response back to client
    const response: SlotClusterResponse = {
      success: true,
      zoom: variables.zoom,
      total: clusteredData.length,
      slots: clusteredData,
      performance: {
        _1_loadingData: loadingData - start,
        _2_loadingStaticData: loadingStaticData - loadingData,
        _3_convertToGeoJson: convertToGeoJson - loadingStaticData,
        _4_clustering: clustering - convertToGeoJson,
        _5_total: clustering - start,
      },
    }
    res.status(200).json(response)
  } catch (e) {
    console.error(e)
    console.error(`Find slots error: ${e.message}`)
    res.status(400).json({ success: false, statusCode: 400, message: e.message })
  }
}

export default graphqlPublic(handler)
