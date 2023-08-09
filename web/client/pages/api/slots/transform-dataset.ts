import _ from 'lodash'
import { promises as fs } from 'fs'
import { NextApiResponse, NextApiRequest } from 'next'
import { Feature, FeatureCollection, Point } from 'geojson'

import { fetchStaticDataset } from 'common/utils/fetchStaticDataset'

import { SlotStatusT } from 'gql/schema'
import { Dataset } from 'gql/utils'

import { SlotProps } from './find'

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const rawDatasetPath = 'data/raw/dataset.json'
const slotsDatasetPath = 'data/processed/dataset.slots.json'
const spacesDatasetPath = 'data/processed/dataset.spaces.json'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const dataset = fetchStaticDataset<Dataset.Dataset>(rawDatasetPath)

    const features: Feature<Point, SlotProps | Dataset.StaticSlot>[] = []

    _.map(dataset.spaces, (space) => {
      _.map(space.blocks, (block, blockIndex) => {
        _.map(block.slots, (slot, slotIndex) => {
          features.push({
            type: 'Feature',
            geometry: slot.location,
            properties: {
              // Default slot props filled with fake data
              id: `static-${space.id}-${blockIndex}-${slotIndex}`,
              booked: false,
              inWorkingHours: false,
              inAmenities: false,
              status: SlotStatusT.Disabled,
              parkingSpaceId: null,
              location: {
                longitude: slot.location.coordinates[0],
                latitude: slot.location.coordinates[1],
              },
              // Static extra data
              static: true,
              staticSpaceId: `static-${space.id}`,
              shape: slot.shape,
            },
          })
        })
      })
    })

    const clusterData: FeatureCollection<Point, {}> = {
      type: 'FeatureCollection',
      features,
    }

    // Process static slots
    await fs.writeFile(slotsDatasetPath, JSON.stringify(clusterData))

    // Process static spaces
    await fs.writeFile(
      spacesDatasetPath,
      JSON.stringify({
        spaces: _.map(
          dataset.spaces,
          (space): Dataset.StaticSpace => ({
            id: `static-${space.id}`,
            static: true,
            name: `unclaimed_space`,
            staticId: space.id,
            photoUrl: null,
            slotsCount: _.reduce(space.blocks, (sum, block) => sum + block.slots.length, 0),
          }),
        ),
      }),
    )

    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default handler
