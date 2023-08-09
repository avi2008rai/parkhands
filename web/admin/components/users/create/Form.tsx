import _ from 'lodash'
import React from 'react'
import { useRouter } from 'next/router'
import { useForm, FormContext, DeepPartial } from 'react-hook-form'
import { FormControl, FormHelperText } from '@material-ui/core'

import { CreateUser } from 'gql/utils'
import { StatusT, useCreateUserMutation, CreateUserInputRecordInput } from 'gql/schema'
import routes from 'common/routes'
import useFormError from 'components/common/hooks/useFormError'
import NameController from 'components/common/form/controller/NameController'

import useStyles from './styles'
import { schemaCreate as validationSchema } from '../validation'
import EmailController from '../controller/EmailController'
import RoleField from '../controller/RoleField'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

const defaultValues: DeepPartial<CreateUser> = {
  name: '',
  email: '',
  role: 'app_single_member',
}

export default function Form() {
  const { t } = useTranslation([Domain.User, Domain.Navigation])

  const methods = useForm<CreateUser>({
    defaultValues,
    validationSchema,
    mode: 'onBlur',
  })
  const { handleSubmit, reset } = methods
  const { FormFooter, FormError, setError, resetError } = useFormError()
  const classes = useStyles()
  const router = useRouter()

  const [createUser, { loading }] = useCreateUserMutation()
  const onSubmit = handleSubmit(async (values, e) => {
    e?.preventDefault()
    resetError()
    try {
      const payload: CreateUserInputRecordInput = {
        ...values,
        status: StatusT.Pending,
      }
      const { data } = await createUser({ variables: { payload } })
      if (data) {
        const id: string = _.get(data, 'createUser.user.id')
        const { href, as } = routes.users.manageById({ id })
        router.push(href, as)
      }
    } catch (error) {
      console.error(error)
      setError(_.get(error, 'graphQLErrors[0].message'))
    }
  })

  return (
    <FormContext {...methods}>
      <form className={classes.root} onSubmit={onSubmit} noValidate autoComplete="off">
        <FormControl fullWidth className={classes.formControl} component="fieldset">
          <FormControl className={classes.formControl}>
            <NameController label="Name" />
          </FormControl>
          <FormControl className={classes.formControl}>
            <EmailController />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <RoleField />
          </FormControl>
          <FormHelperText variant="outlined">
            {t('profile_completion')}
          </FormHelperText>
        </FormControl>
        <FormError />
        <FormFooter
          submit
          submitProps={{ loading, label: t('create', { ns: Domain.Navigation })}}
          cancel
          cancelProps={{ ...routes.users.index }}
          reset
          resetProps={{ onClick: () => reset(defaultValues) }}
        />
      </form>
    </FormContext>
  )
}
