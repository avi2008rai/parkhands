module.exports = {
  queries: {
    list: {
      all: `
        query {
          vehicleSizesList {
            id
            status
            name
            description

          }
        }`
    }
  },
  mutations: {
    create: `
      mutation CreateVehicleSize($vehicleSize: VehicleSizeInput!) {
        createVehicleSize(input: { vehicleSize: $vehicleSize }) {
          vehicleSize {
            status
            name
            description
          }
        }
      }`,
    update: `
      mutation UpdateVehicleSize($id: UUID!, $patch: VehicleSizePatch!) {
        updateVehicleSize(input: { id: $id, patch: $patch }) {
          vehicleSize {
            status
            name
            description
          }
        }
      }`,
    delete: `
      mutation DeleteVehicleSize($id: UUID!) {
        deleteVehicleSize(input: { id: $id }) {
          vehicleSize { id }
        }
      }`
  },
  variables: {
    small: (name = 'Test Small', status = 'PUBLISHED', description = 'Small space designed for small cars') => {
      return {
        vehicleSize: {
          name: name
          , status: status
          , description: description
        }
      }
    }
  }
}
