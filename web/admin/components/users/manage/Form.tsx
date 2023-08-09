import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useForm, FormContext } from 'react-hook-form'
import { FormControlLabel, FormControl, Box } from '@material-ui/core'

import routes from 'common/routes'
import useFormError from 'components/common/hooks/useFormError'
import NameController from 'components/common/form/controller/NameController'
import StatusController from 'components/common/form/controller/StatusController'
import HiddenIdController from 'components/common/form/controller/HiddenIdController'
import { User, ManageUserQuery, useDeleteUserMutation, useUpdateUserMutation } from 'gql/schema'
import { UserRoleString } from 'gql/utils'

import useStyles from './styles'
import { schemaUpdate as validationSchema } from '../validation'
import EmailController from '../controller/EmailController'
import RoleField from '../controller/RoleField'
import { useUser } from 'components/hooks/useUser'

const userToForm = ({ user }: ManageUserQuery) => ({
  id: user?.id,
  name: user?.name,
  email: user?.email,
  role: (user?.role as unknown) as UserRoleString,
  status: user?.status,
})

export default function Form({ user, refreshData }: ManageUserQuery & { refreshData: () => void }) {
  if (!user) {
    return <div>No user</div>
  }
  // Check if user edits their own account
  const { user: CurrentUser } = useUser()
  const ownAccount = useMemo(() => user.id === CurrentUser.id, [user, CurrentUser])

  const methods = useForm<User>({
    defaultValues: userToForm({ user }),
    validationSchema,
    mode: 'onBlur',
  })
  const { handleSubmit, reset, errors } = methods
  const { FormFooter, FormError, setError, resetError } = useFormError()

  const classes = useStyles()
  const router = useRouter()

  useEffect(() => {
    reset(userToForm({ user }))
  }, [user])

  const [updateUser, { loading }] = useUpdateUserMutation()
  const [deleteUser] = useDeleteUserMutation()
  const onSubmit = handleSubmit(async (payload, e) => {
    e?.preventDefault()
    resetError()
    try {
      await updateUser({
        variables: {
          payload: {
            ...payload,
            status: payload.status,
          },
        },
      })
      refreshData()
    } catch (error) {
      console.error(error)
      setError(_.get(error, 'graphQLErrors[0].detail', _.get(error, 'graphQLErrors[0].message')))
    }
  })

  return (
    <FormContext {...methods}>
      <form className={classes.root} onSubmit={onSubmit} noValidate autoComplete="off">
        <FormControl fullWidth className={classes.formControl} component="fieldset">
          <Box display="flex" justifyContent="space-between">
            <HiddenIdController />
            <FormControl disabled={ownAccount}>
              <FormControlLabel control={<StatusController />} label="Status" />
            </FormControl>
          </Box>
          <FormControl disabled className={classes.formControl}>
            <NameController label="Name" />
          </FormControl>
          <FormControl className={classes.formControl}>
            <EmailController />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl} disabled={ownAccount}>
            <RoleField />
          </FormControl>
        </FormControl>
        <FormError />
        {!_.isEmpty(errors) && <pre>{JSON.stringify(errors, null, 2)}</pre>}
        <FormFooter
          submit
          submitProps={{ loading, label: 'Update' }}
          cancel
          cancelProps={{ ...routes.users.index }}
          reset
          resetProps={{ onClick: () => reset(userToForm({ user })) }}
          deleteButton={!ownAccount}
          deleteProps={{
            onConfirm: async () => {
              try {
                await deleteUser({ variables: { id: user.id } })
              } catch (error) {
                console.error(error)
              } finally {
                const { href, as } = routes.users.index
                router.push(href, as)
              }
            },
          }}
        />
      </form>
    </FormContext>
  )
}
