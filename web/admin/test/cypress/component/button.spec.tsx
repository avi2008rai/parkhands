import React from 'react'
import { mount } from 'cypress-react-unit-test'
import { Button } from '@material-ui/core'

export default describe('Buttons', () => {
  it('MuiButton is visible', () => {
    mount(<Button>Button Label</Button>)
    cy.contains('button', 'Button Label').should('be.visible')
  })
})
