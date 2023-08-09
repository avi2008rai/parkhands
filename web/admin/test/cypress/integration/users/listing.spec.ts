export default context('Users', () => {
  before(() => {
    cy.loginAs('super_admin')
    cy.visitNav('Users')
  })

  it('validate users listing url', () => {
    cy.checkUrl('/users')
  })

  it('display data table title', () => {
    cy.get('[role="toolbar"]').find('h6').should('contain', 'Users')
  })
})
