Cypress.Commands.add('checkUrl', (pathname) => {
  const { baseUrl } = Cypress.config()
    cy.url({ timeout: 90000 })
      .should('eq', `${baseUrl}${pathname}`)
})

Cypress.Commands.add('verifyError', (error) => {
  cy.get('div[role="alert"]').find('.MuiAlert-message').should('contain', error)
})
export {}
