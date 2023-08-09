import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    leftColumn: {
      marginBottom: theme.spacing(2),
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    formControl: {
      marginTop: theme.spacing(2),
    },
    statusField: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    paper: {
      width: '100%',
    },
    avatar: {
      padding: theme.spacing(0),
      backgroundColor: 'transparent',
      width: '20px',
      height: '20px',
    },
  }),
)

export default useStyles