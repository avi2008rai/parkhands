import React from 'react'

/**
 * Used to submit forms that are submitted outside of them by ref
 *
 * When this component is located inside the form the form can be
 * submitted by hitting enter key on any of the form fields.
 */
export default function HiddenSubmitButton() {
  return <button type="submit" style={{ display: 'none' }} />
}
