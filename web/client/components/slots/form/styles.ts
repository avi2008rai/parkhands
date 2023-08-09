import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(2),
    },
    statusField: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  }),
)

export default useStyles
