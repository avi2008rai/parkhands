import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      height: '2rem',
      width: '100%',
    },
    checkmark: {
      height: '100%',
      width: '60%',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: (props: { dense?: boolean } | undefined) => {
        const { dense } = props || { dense: false }
        return theme.spacing(dense ? 1 : 3)
      },
      flexGrow: 6,
    },
    formBase: {
      width: '100%', // Fix IE 11 issue.
    },
    submit: {
      margin: theme.spacing(2, 0, 3),
    },
  }),
)

export default useStyles
