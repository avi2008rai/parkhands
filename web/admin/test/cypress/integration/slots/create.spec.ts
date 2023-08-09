export default context('Create Slot', () => {
  beforeEach(() => {
    cy.loginAs('super_admin')
  })

  it('validate slots create ulr via Create Fab', () => {
    cy.visitNav('Slots')
    cy.checkUrl('/slots')
    cy.wait(200)
    cy.get('div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2.MuiGrid-justify-xs-flex-end > div:nth-child(2) > button').click()
    cy.checkUrl('/slots/create')
  })

  it('validate slots create url via nav', () => {
    cy.visitNavSecondary('Slots')
    cy.checkUrl('/slots/create')
  })

  it('validate slots create url via nav', () => {
    cy.visitNavSecondary('Slots')
    cy.checkUrl('/slots/create')
  })
})
