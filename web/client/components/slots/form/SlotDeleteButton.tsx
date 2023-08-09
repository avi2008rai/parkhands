import _ from 'lodash'
import React from 'react'
import { useRouter } from 'next/router'
import { FormControl } from '@material-ui/core'

import { ManageSlotQuery, PickArrayType, useDeleteSlotMutation } from 'gql/schema'
import routes from 'common/routes'
import DeleteButton from 'components/common/form/DeleteButton'

import useStyles from './styles'

type Slot = PickArrayType<ManageSlotQuery['slot']>
type DeleteSlotButtonProps = {
  slot?: Slot
}

export default function SlotDeleteButton({ slot }: DeleteSlotButtonProps) {
  const classes = useStyles()
  const router = useRouter()
  const [deleteSlot] = useDeleteSlotMutation()

  if (!slot) {
    return null
  }

  return (
    <FormControl className={classes.formControl}>
      <DeleteButton
        onConfirm={async () => {
          try {
            await deleteSlot({ variables: { id: slot?.id } })
          } catch (error) {
            console.error(error)
          } finally {
            const { href, as } = routes.slots.index
            router.push(href, as)
          }
        }}
      />
    </FormControl>
  )
}
