import gql from 'graphql-tag'

export default gql`
  query ListAmenities {
    amenitiesList(filter: { slug: { notIn: ["business", "private"] } }) {
      id
      name
      status
      slug
    }
    categoriesList: amenitiesList(filter: { slug: { in: ["business", "private"] } }) {
      id
      name
      status
      slug
    }
  }
`
