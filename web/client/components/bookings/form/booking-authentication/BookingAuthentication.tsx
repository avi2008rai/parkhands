import React, { useState } from 'react'

import BookingLogin from './BookingLogin'
import BookingRegister from './BookingRegister'

enum AuthForms {
  Login = 'login',
  Register = 'register',
  ForgottenPassword = 'forgottenPassword',
}

export default function BookingAuthentication() {
  const [selectedForm, setSelectedForm] = useState<AuthForms>(AuthForms.Login)

  switch (selectedForm) {
    case AuthForms.Login:
      return (
        <BookingLogin
          linksProps={{
            registerOnClick: () => {
              setSelectedForm(AuthForms.Register)
            },
          }}
        />
      )
    case AuthForms.Register:
      return (
        <BookingRegister
          linksProps={{
            loginOnClick: () => {
              setSelectedForm(AuthForms.Login)
            },
          }}
        />
      )
    default:
      return <div></div>
  }
}
