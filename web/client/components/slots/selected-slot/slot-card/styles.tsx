import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.common.white,
      padding: 0,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: theme.spacing(1),
    },
    cardContent: {
      '&&': {
        padding: theme.spacing(1),
      },
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      minHeight: '7rem',
    },
    name: {
      fontSize: theme.typography.pxToRem(12),
    },
    address: {
      color: theme.palette.grey[600],
      fontSize: theme.typography.pxToRem(9),
    },
    amenityIcon: {
      padding: theme.spacing(0.2),
    },
    cta: {
      borderRadius: theme.shape.borderRadius,
      flexGrow: 0.5,
      boxShadow: theme.shadows[0],
      fontSize: theme.typography.pxToRem(12),
    },
  }),
)
