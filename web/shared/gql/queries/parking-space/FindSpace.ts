import gql from 'graphql-tag'
 
export default gql`
 query MyParkingSpacesList($ownerId: UUID!) {
 parkingSpacesList(condition: { ownerId: $ownerId }, orderBy: NAME_ASC) {
 id
 status
 name
 }
 }
`
