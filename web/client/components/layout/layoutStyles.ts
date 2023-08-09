// "Inspired" from https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/

import { makeStyles } from '@material-ui/core/styles'

type ThemeProps = {
  gutter: boolean
}

const useStyles = makeStyles((theme) => ({
  root: () => ({
    display: 'flex',
    flexDirection: 'column',
  }),
  container: {
    display: 'flex',
    justifyItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  toolbar: theme.mixins.toolbar,
  content: ({ gutter }: ThemeProps) => ({
    zIndex: 0,
    flexGrow: 2,
    position: 'relative',
    margin: gutter ? theme.spacing(5, 0) : 0,
  }),
  modal: {
    pointerEvents: 'none',
  },
  absoluteContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: theme.zIndex.modal,
  },
  disablePointerEvents: {
    pointerEvents: 'none',
  },
  enablePointerEvents: {
    pointerEvents: 'all',
  },
}))

export default useStyles
