Cypress.Commands.add('clickLink', (label) => {
  cy.get('a').contains(label).click()
})

Cypress.Commands.add('visitNav', (label) => {
  cy.get('ul[aria-label="main"]').find('a span').contains(label).click()
})
Cypress.Commands.add('visitNavSecondary', (label) => {
  cy.get('ul[aria-label="main"]')
    .find('a span')
    .contains(label)
    .parents('.MuiListItem-container')
    .find('.MuiListItemSecondaryAction-root a')
    .click()
})
export {}
