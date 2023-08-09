import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    text: {
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.typography.pxToRem(9),
      },
    },
    slotName: {
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.typography.pxToRem(12),
      },
    },
  }),
)