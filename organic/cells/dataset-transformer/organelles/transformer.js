import _ from 'lodash'
const dna = require('config')
const Minio = require('minio')

// Config
let srcBucket = process.env.DATASET_SOURCE_BUCKET
let dstSlotsBucket = process.env.DATASET_STATIC_SLOTS_BUCKET
let dstSpacesBucket = process.env.DATASET_STATIC_SPACES_BUCKET

let startupSync = process.env.DATASET_STARTUP_SYNC === 'true'

let minioConfig = {
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  secure: process.env.MINIO_SECURITY === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
}

// Utils
function join(...args) {
  return "'" + args.join(':') + "'"
}

function urlDecode(str) {
  return decodeURIComponent((str + '').replace(/\+/g, '%20'))
}

module.exports = async ({ plasma }) => {
  plasma.once(['pg-ready'], ({ pg }) => {
    // Main
    const mc = new Minio.Client(minioConfig)
    const listener = mc.listenBucketNotification(srcBucket, '', '', ['s3:ObjectCreated:*'])
    console.log(`Listening on ${join(srcBucket)} for events`)

    function transformDataset(objectPath) {
      mc.getObject(srcBucket, objectPath, function (err, dataStream) {
        console.log(`Processing ${join(dstSlotsBucket, objectPath)}`)

        if (err) {
          return console.log(`Error retrieving ${join(srcBucket, objectPath)}: ${join(err)}`)
        }
        mc.statObject(srcBucket, objectPath, function (err, stat) {
          if (err) {
            return console.log(err)
          }
          // get buffer from stream
          const chunks = []
          dataStream.on('error', function (err) {
            console.log(err)
          })
          dataStream.on('data', function (chunk) {
            chunks.push(chunk)
          })
          dataStream.on('end', function () {
            // convert dataset buffer to json
            const dataset = JSON.parse(Buffer.concat(chunks).toString('utf8'))

            // transform dataset into features
            const features = []
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
                      status: 'DISABLED',
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

            const clusterData = {
              type: 'FeatureCollection',
              features,
            }

            // save processed file in static-slots bucket
            const outputSlots = JSON.stringify(clusterData)
            mc.putObject(dstSlotsBucket, objectPath, outputSlots, stat.metaData, (err, etag) => {
              if (err) {
                return console.log(`Error saving ${join(dstSlotsBucket, objectPath)}: ${join(err)}`)
              }
              console.log(`Successfully uploaded ${join(dstSlotsBucket, objectPath)}`)
            })

            // save processed file in static-spaces bucket
            const outputSpaces = JSON.stringify({
              spaces: _.map(dataset.spaces, (space) => ({
                id: `static-${space.id}`,
                static: true,
                name: `Unclaimed space`,
                staticId: space.id,
                photoUrl: null,
                slotsCount: _.reduce(space.blocks, (sum, block) => sum + block.slots.length, 0),
              })),
            })

            mc.putObject(dstSpacesBucket, objectPath, outputSpaces, stat.metaData, (err, etag) => {
              if (err) {
                return console.log(
                  `Error saving ${join(dstSpacesBucket, objectPath)}: ${join(err)}`,
                )
              }
              console.log(`Successfully uploaded ${join(dstSpacesBucket, objectPath)}`)
            })
          })
        })
      })
    }

    listener.on('notification', (record) => transformDataset(urlDecode(record.s3.object.key)))

    if (startupSync) {
      mc.listObjects(srcBucket, '', true).on('data', (obj) => {
        let objectPath = obj.name
        mc.statObject(dstSlotsBucket, objectPath, (err, stat) => {
          if (err) {
            console.log(
              `Path ${join(dstSlotsBucket, objectPath)} does not exist - transforming from ${join(
                srcBucket,
              )}`,
            )
            transformDataset(objectPath)
          }
        })
      })
    }

    process.on('SIGINT', function () {
      listener.stop()
      process.exit()
    })
  })
}
