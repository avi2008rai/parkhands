module.exports = {
  queries: {
    usersList: `
      query {
        usersList {
          id
          name
          email
          role
          status
          deleted
        }
      }
    `,
    me: `
      query {
        me
      }
    `,
    email_available: `
      query emailAvailable($requested_email: Email!) {
        emailAvailable(requestedEmail: $requested_email)
      }
    `,
    user_premium: `
      query userPremium($user_id: UUID!) {
        userPremium(userId: $user_id)
      }
    `,
  },
  mutations: {
    register: `
      mutation Register($payload: RegisterInputRecordInput!) {
        register(input: { payload: $payload }) {
          jwtToken
        }
      }
    `,
    resend_activation_email: `
      mutation resendActivationEmail($requested_email: Email!) {
        resendActivationEmail(input: { requestedEmail: $requested_email }) {
          success: boolean
        }
      }
    `,
    reset_password: `
      mutation ResetPassword($payload: ResetPasswordInputRecordInput!) {
        resetPassword(input: { payload: $payload }) {
          boolean
        }
      }
    `,
    login: `
      mutation Login($payload: LoginInputRecordInput!) {
        login(input: { payload: $payload }) {
          jwtToken
        }
      }
    `,
    create: `
      mutation createUser($payload: CreateUserInputRecordInput!) {
        createUser(input: { payload: $payload }) {
          user {
            id
            name
            email
            role
            status
          }
        }
      }
    `,
    update: `
      mutation updateUser($payload: UpdateUserInputRecordInput!) {
        updateUser(input: { payload: $payload }) {
          user {
            id
            name
            email
            role
            status
            photoUrl
            address
            emailConfirmed
          }
        }
      }
    `,
    activate: `
      mutation activateUser($payload: ActivateUserInputRecordInput!) {
        activateUser(input: { payload: $payload }) {
          jwtToken
        }
      }
    `,
    delete: `
      mutation deleteUser($id: UUID!) {
        deleteUser(input: { id: $id }) {
          deletedUserNodeId
        }
      }
    `,
  },
  api: {
    get_api_keys: `
      query getApiKeys($user_id: UUID!) {
        getApiKeysList(userId: $user_id) {
          id
          description
          expireAt
          userId
          createdAt
        }
      }
    `,
  },
  variables: {
    register: (
      email = 'bilbo@bagins.shire',
      password = null,
      name = 'Bilbo Bagins',
      phone = '+389123456789',
      licensePlate = 'CC 6688 KN',
    ) => {
      return {
        payload: {
          email,
          password,
          name,
          phone,
          licensePlate,
        },
      }
    },
  },
}
