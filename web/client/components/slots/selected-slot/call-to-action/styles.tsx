import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    cta: {
      height: theme.spacing(6),
      borderRadius: 0,
      flexGrow: 1,
    },
    label: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    image: {
      width: '100%',
      height: '10rem',
      objectFit: 'cover',
    },
    buttonContainer: {
      position: 'fixed',
      bottom: theme.spacing(3.25),
    },
  }),
)
