import { common, red } from '@material-ui/core/colors'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const colors = {
  dark: '#243441',
  light: '#385062',
  contrast: '#00FFF1',
  background: '#263846',
  backgroundDefault: '#253644',
}
// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nunito',
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2.25rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.25rem',
    },
    h5: {
      fontSize: '1rem',
    },
    h6: {
      fontSize: '.85rem',
    },
  },
  palette: {
    type: 'dark',
    background: {
      paper: '#FFFFFF',
      default: colors.backgroundDefault,
    },
    primary: {
      main: colors.dark,
    },
    secondary: {
      main: colors.contrast,
    },
    error: {
      main: red.A100,
    },
  },
  shape: {
    borderRadius: 8,
  },
  zIndex: {
    // ref: https://material-ui.com/customization/z-index/
    mobileStepper: 400,
    speedDial: 450,
    appBar: 500,
    drawer: 600,
    modal: 700,
    snackbar: 900,
    tooltip: 1000,
  },
  props: {
    MuiPaper: {
      elevation: 4,
    },
    MuiCard: {
      elevation: 4,
    },
    MuiDrawer: {
      PaperProps: {
        elevation: 4,
      },
    },
    MuiGrid: {
      spacing: 2,
    },
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      containedPrimary: {
        color: colors.contrast,
        background:
          'transparent linear-gradient(131deg, #263846 0%, #243542 45%, #22323E 100%) 0% 0% no-repeat padding-box',
        fontWeight: 'normal',
      },
    },
    MuiLinearProgress: {
      root: {
        height: '.5rem',
      },
      colorPrimary: {
        backgroundColor: colors.dark,
      },
      barColorPrimary: {
        backgroundColor: colors.light,
      },
    },
    MuiOutlinedInput: {
      input: {
        color: colors.contrast,
        // Resets webkit autofill style
        '&:-webkit-autofill': {
          '-webkit-box-shadow': `0 0 0 100px ${colors.dark} inset`,
          '-webkit-text-fill-color': common.white,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: '6px',
      },
    },
    MuiDialogActions: {
      root: {
        backgroundColor: colors.light,
      },
    },
  },
})

export default responsiveFontSizes(theme)
