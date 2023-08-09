import gql from 'graphql-tag'

import CommonSlotFields from './fragments/CommonSlotFields'

export default gql`
  query SlotsList {
    slotsList(orderBy: CREATED_AT_DESC) {
      ...CommonSlotFields
    }
  }
  ${CommonSlotFields}
`
