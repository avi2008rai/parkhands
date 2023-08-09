import gql from 'graphql-tag'

/*
{
  "payload": {
    "vehicle": {
      "name": "Test Vehicle",
      "licensePlate": "B1374PK",
      "vehicleTypeId": "{{ params.vehicleTypes.small  }}"
    }
  }
}
*/

export default gql`
  mutation CreateVehicle($payload: CreateVehicleInput!) {
    createVehicle(input: $payload) {
      vehicle {
        id
        status
        ownerId
        licensePlate
        vehicleTypeId
      }
    }
  }
`
