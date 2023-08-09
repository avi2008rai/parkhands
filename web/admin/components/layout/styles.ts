// "Inspired" from https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    padding: theme.spacing(3),
  },
  content: {
    flex: 1,
  },
}))

export default useStyles
