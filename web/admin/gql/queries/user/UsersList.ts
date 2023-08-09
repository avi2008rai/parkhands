import gql from 'graphql-tag'

import { UserRoleString, UserAddress } from 'gql/utils'
import { StatusT } from 'gql/schema'

export type UsersList = {
  id: string
  name: string
  email: string
  photoUrl: string
  role: UserRoleString
  status: StatusT
  address?: UserAddress
}

export type UsersListPayload = {
  usersList: UsersList[]
}

export default gql`
  query UsersList {
    usersList(orderBy: CREATED_AT_DESC) {
      id
      name
      email
      role
      status
      photoUrl
      address
    }
  }
`
