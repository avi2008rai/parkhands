module.exports = {
  getAmenities: `
    query {
      amenitiesList {
        id
        name
        status
        description
        weight
        createdAt
        updatedAt
      }
    }
  `,

  getAmenityDetails: function (id) {
    let query = `
          query {
            amenity(id: "${id}") {
              id
              name
              status
              description
              weight
              createdAt
              updatedAt
            }
          }
        `
    return query
  },
}
