Cypress.Commands.add('loginAs', (emailPrefix, password = '12345678') => {
  cy.visit('login')
  cy.typeLogin({
    email: `${emailPrefix}@parkhands.de`,
    password,
  })
  cy.get('form').submit()
})

Cypress.Commands.add('typeLogin', (user) => {
  cy.get('input[name=email]').type(user.email)
  cy.get('input[name=password]').type(user.password)
})
export {}
