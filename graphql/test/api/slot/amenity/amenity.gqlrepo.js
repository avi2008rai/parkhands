module.exports = {
  queries: {
    list: {
      all: `
        query {
          amenitiesList {
            id
            status
            name
            description
            slug
          }
        }`,
    },
  },
  mutations: {
    create: `
      mutation CreateAmenity($amenity: AmenityInput!) {
        createAmenity(input: { amenity: $amenity }) {
          amenity {
            status
            name
            weight
            description
            slug
          }
        }
      }`,
    update: `
      mutation UpdateAmenity($id: UUID!, $patch: AmenityPatch!) {
        updateAmenity(input: { id: $id, patch: $patch }) {
          amenity {
            status
            name
            weight
            description
            slug
          }
        }
      }`,
    delete: `
      mutation DeleteAmenity($id: UUID!) {
        deleteAmenity(input: { id: $id }) {
          amenity { id }
        }
      }`,
  },
  variables: {
    electric: (
      name = 'Mega Electric',
      description = 'Small space designed for small cars',
      status = 'PUBLISHED',
      weight = 5,
    ) => {
      return {
        amenity: {
          name: name,
          status: status,
          weight: weight,
          description: description,
        },
      }
    },
  },
}
