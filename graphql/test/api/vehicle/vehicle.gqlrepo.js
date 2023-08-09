module.exports = {
  queries: {
    list: {
      all: `
        query {
          vehiclesList {
            id
            name
            ownerId
            licensePlate
            vehicleTypeId
            vehicleSizeId
            status
          }
        }`
    }
  },
  mutations: {
    create: `
      mutation CreateVehicle($vehicle: VehicleInput!) {
        createVehicle(input: { vehicle: $vehicle }) {
          vehicle {
            id
            name
            ownerId
            licensePlate
            vehicleTypeId
            vehicleSizeId
            status
          }
        }
      }`,
    update: `
      mutation UpdateVehicle($id: UUID!, $patch: VehiclePatch!) {
        updateVehicle(input: { id: $id, patch: $patch }) {
          vehicle {
            name
            ownerId
            licensePlate
            vehicleTypeId
            vehicleSizeId
            status
          }
        }
      }`,
    delete: `
      mutation DeleteVehicle($id: UUID!) {
        deleteVehicle(input: { id: $id }) {
          vehicle { id }
        }
      }`
  },
  variables: {
    nissan: (
      name = 'Nissan gtr',
      license_plate = 'CC 3344 55',
      vehicle_type_id = 'c2b47b1e-9412-4606-bb8d-49b3cc491a6d',
      vehicle_size_id = '59ae4bb4-2035-4eb2-9adf-abbc3f8aa50f',
      status = 'ENABLED'
    ) => {
      return {
        vehicle: {
          name: name
          , licensePlate: license_plate
          , vehicleTypeId: vehicle_type_id
          , vehicleSizeId: vehicle_size_id
          , status: status
        }
      }
    }
  }
}
