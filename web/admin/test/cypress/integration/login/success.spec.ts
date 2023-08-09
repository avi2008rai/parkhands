export default context('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it.skip('has variable ADMIN_URL from plugins', () => {
    expect(Cypress.env('ADMIN_URL')).to.equal('ok')
  })

  it('validate login url', () => {
    cy.checkUrl('/login')
  })

  it('login as single member', () => {
    cy.loginAs('single_member')
    cy.checkUrl('/')
  })

  it('login as super admin', () => {
    cy.loginAs('super_admin')
    cy.checkUrl('/')
  })

  it('display error when login with bad email', () => {
    cy.loginAs('wrong_email')
    cy.checkUrl('/login')
    cy.verifyError('User not found with provided email and password')
  })

  it('display error when login with bad password', () => {
    cy.loginAs('super_admin', 'wrongPa$$word')
    cy.checkUrl('/login')
    cy.verifyError('User not found with provided email and password')
  })
})
