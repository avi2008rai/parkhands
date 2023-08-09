import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: '0 auto',
  },
}))

export default useStyles
