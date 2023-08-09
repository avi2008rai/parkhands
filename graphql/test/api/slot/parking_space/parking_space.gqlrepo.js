module.exports = {
  queries: {
    list_parking_spaces: `
      query {
        parkingSpacesList {
          id
          name
          ownerId
          description
          address
          slug
          createdAt
          updatedAt
          location {
            geojson
            longitude
            latitude
          }
        }
      }
    `
  },
  mutations: {
    update:`
      mutation UpdateParkingSpace($id: UUID!, $patch: ParkingSpacePatch!) {
        updateParkingSpace(input: { id: $id, patch: $patch }) {
          parkingSpace {
            id
            name
            ownerId
            settings
            description
            address
            slug
            createdAt
            updatedAt
            location {
              geojson
              longitude
              latitude
            }
          }
        }
      }
    `,
    create:`
      mutation CreateParkingSpace($payload: CreateParkingSpaceInput!) {
        createParkingSpace(input: $payload) {
          parkingSpace {
            id
            name
            ownerId
            settings
            description
            address
            slug
            createdAt
            updatedAt
            location {
              geojson
              longitude
              latitude
            }
          }
        }
      }
    `,
    delete:`
      mutation deleteParkingSpace($id: UUID!) {
        deleteParkingSpace(input: { id: $id }) {
          parkingSpace { id }
        }
      }
    `
  },
  variables: {
    supermarket: function (user, name = 'SuperMarket Parkhands') {
      return {
        payload: {
          parkingSpace: {
            ownerId: user.me.id,
            name: name,
            location: {
              type: 'Point',
              coordinates: [23.3218675, 42.6977082]
            }
          }
        }
      }
    }
  }
}
