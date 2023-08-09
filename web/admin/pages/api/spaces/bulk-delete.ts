import _ from 'lodash'
import { NextApiResponse, NextApiRequest } from 'next'

import { DeleteParkingSpaceMutation, DeleteParkingSpaceDocument } from 'gql/schema'
import { graphqlAuth, AuthContext } from 'common/utils/middleware/graphqlAuth'

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
}

export type RequestBody = {
  spaceIds: string[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse, { client }: AuthContext) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }
  const variables: RequestBody = req.body
  console.log({ variables })

  try {
    // Send all parsed csv records to the graphql server
    const deleted = await Promise.all(
      _.map(variables.spaceIds, async (spaceId) => {
        try {
          const { data } = await client.mutate<DeleteParkingSpaceMutation>({
            mutation: DeleteParkingSpaceDocument,
            variables: { id: spaceId },
          })
          return data?.deleteParkingSpace?.deletedParkingSpaceNodeId
        } catch (error) {
          console.error('GraphQL processing error', error)
        }
      }),
    )

    // Send response back to client
    res.status(200).json({ deleted: _.filter(deleted) })
  } catch (e) {
    console.error(`CSV upload error: ${e.message}`)
    res.status(400).json({ statusCode: 400, message: e.message })
  }
}

export default graphqlAuth(handler)
