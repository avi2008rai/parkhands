/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Cypress {
  interface Chainable<Subject> {
    // Authentication
    loginAs(email: 'single_member' | 'super_admin' | string, password?: string): Chainable<any>
    typeLogin({ email, password }: { email: string; password: string }): Chainable<any>
    // Navigation
    visitNav(label: string): Chainable<any>
    visitNavSecondary(label: string): Chainable<any>
    clickLink(label: string): Chainable<any>
    // Validation
    checkUrl(pathname: string): Chainable<any>
    verifyError(error: string): Chainable<any>
  }
}
