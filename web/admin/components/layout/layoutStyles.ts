// "Inspired" from https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    padding: theme.spacing(3),
    backgroundImage: `url("/static/parkhandsLoginBg.png")`,
    backgroundSize: 'cover',
  },
  content: {
    flex: 1,
  },
  loginContainer: {
    alignItems: 'center',
    display: 'flex',
  },
}))

// boxShadow: '3px 3px 10px rgb(12 17 22 / 50%), -3px -3px 10px rgb(79 93 103 / 50%)',
export default useStyles
