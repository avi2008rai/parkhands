export default context('Create Vehicle', () => {
  beforeEach(() => {
    cy.loginAs('super_admin')
    cy.visitNav('Vehicles')
  })

  it('validate vehicles create ulr via Create Fab', () => {
    cy.visitNav('Vehicles')
    cy.checkUrl('/vehicles')
    cy.get('[role="create-item"]').click()
    cy.checkUrl('/vehicles/create')
  })

  it('create random vehicle and validate in on main page', () => {
    cy.visitNavSecondary('Vehicles')
    cy.checkUrl('/vehicles/create')
    cy.get('[aria-labelledby="owner-id-label mui-component-select-ownerId"]').click()
    cy.get('li[role="option"]').contains('Single Member').click()
    const vehicleName = Math.random().toString(36).substring(7).toUpperCase()
    cy.get('[name="licensePlate"]').type(vehicleName)
    cy.get('[name="name"]').type(vehicleName)
    cy.get('[aria-labelledby="vehicle-type-id-label mui-component-select-vehicleTypeId"]').click()
    cy.get('li[role="option"]').contains('Hybrid').click()
    cy.get('[aria-labelledby="slot-type-label mui-component-select-vehicleSizeId"]').click()
    cy.get('li[role="option"]').contains('Large').click()
    cy.wait(200)
    cy.get('form').submit()
    cy.checkUrl('/vehicles')
    cy.get('[aria-label="licensePlate"]').find('a').should('contain', vehicleName)
  })
})
