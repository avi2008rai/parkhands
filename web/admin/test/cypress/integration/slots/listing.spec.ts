export default context('Slots listings', () => {
  before(() => {
    cy.loginAs('super_admin')
    cy.visitNav('Slots')
  })

  it('validate slots listing url', () => {
    cy.checkUrl('/slots')
  })

  it('display data table title', () => {
    cy.get('[role="toolbar"]').find('h6').should('contain', 'Slots')
  })
})
