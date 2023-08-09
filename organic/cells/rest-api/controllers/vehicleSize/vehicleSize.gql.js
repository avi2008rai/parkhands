module.exports = {
  getVehicleSizes: `
    query {
      vehicleSizesList {
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

  getVehicleSizeDetails: function (id) {
    let query = `
          query {
            vehicleSize(id: "${id}") {
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
