import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  button: {
    margin: theme.spacing(3),
  },
}))

export default useStyles
