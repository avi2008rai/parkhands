import React, { useState, createContext, useContext } from 'react'
import { useApolloClient } from '@apollo/client'

import { CurrentUser } from 'gql/utils'
import { CurrentUserQuery, CurrentUserDocument } from 'gql/schema'
import { apolloLink } from 'common/utils/apolloClient'

type JwtToken = string
type UserContextProps = {
  initialUser?: CurrentUser
  initialToken?: JwtToken
}
type UserContext = {
  loggedIn: boolean
  jwtToken?: string
  currentUser?: CurrentUser
  setJwtToken: (token: JwtToken) => void
  setCurrentUser: (user: CurrentUser) => void
}
const DefaultContext = ({ initialUser, initialToken }: UserContextProps): UserContext => {
  const [loggedIn, setLoggedIn] = useState<boolean>(!!initialUser)
  const [jwtToken, setJwtToken] = useState<JwtToken | undefined>(initialToken)
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(initialUser)
  const client = useApolloClient()

  return {
    loggedIn,
    jwtToken,
    currentUser,
    setJwtToken: async (token?: JwtToken) => {
      if (token) {
        const link = apolloLink({ jwtToken: token, sendAuthHeader: true })
        client.setLink(link)
        try {
          const { data } = await client.query<CurrentUserQuery>({
            query: CurrentUserDocument,
          })
          if (data?.currentUser) {
            setCurrentUser(data.currentUser as CurrentUser)
            setLoggedIn(true)
          } else {
            setLoggedIn(false)
          }
        } catch (error) {
          console.error(error)
          setLoggedIn(false)
        }
      }
      setJwtToken(token)
    },
    setCurrentUser: (user: CurrentUser) => {
      setCurrentUser(user)
      setLoggedIn(true)
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserContext = createContext<UserContext>(null as any)

export function UserProvider({
  children,
  initialUser,
  initialToken,
}: React.PropsWithChildren<UserContextProps>) {
  const { Provider } = UserContext
  return <Provider value={DefaultContext({ initialUser, initialToken })}>{children}</Provider>
}

export const useUserContext = () => {
  return useContext(UserContext)
}
