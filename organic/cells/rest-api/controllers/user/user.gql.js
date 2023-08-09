module.exports = {
  getUsers: `
    query {
      usersList {
        id
        name
        email
        status
        role
        photoUrl
        phone
        address
        createdAt
        updatedAt
      }
    }
  `,

  createUser: `
    mutation createUser($payload: CreateUserInputRecordInput!) {
      createUser(input: { payload: $payload }) {
        user {
          id
          name
          email
          status
          role
          photoUrl
          phone
          address
          createdAt
          updatedAt
        }
      }
    }
  `,

  getUserDetails: function (id) {
    let query = `
      query {
        user(id: "${id}") {
          id
          name
          email
          status
          role
          photoUrl
          phone
          address
          createdAt
          updatedAt
        }
      }
        `
    return query
  },

  updateUser: `
    mutation updateUser($payload: UpdateUserInputRecordInput!) {
      updateUser(input: { payload: $payload }) {
        user {
          id
          name
          email
          status
          role
          photoUrl
          phone
          address
          createdAt
          updatedAt
        }
      }
    }
  `,

  deleteUser: `
    mutation deleteUser($id: UUID!) {
      deleteUser(input: { id: $id }) {
        user { id }
      }
    }
  `,

}
