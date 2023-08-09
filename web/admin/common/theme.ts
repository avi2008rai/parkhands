import _ from 'lodash'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { Shadows } from '@material-ui/core/styles/shadows'

export const colors = {
  dark: '#243441',
  light: '#385062',
  textLight: '#F4F1ED', // grey
  error: '#ff555d',
  contrast: '#00FFF1', // logo
  background: '#243441',
  backgroundDefault: '#253644',
  polyStrokeColor: '#57ACF9',
  polyFillColor: '#BCDCF9',
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
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
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
      paper: colors.background,
      default: colors.backgroundDefault,
    },
    primary: {
      main: colors.dark,
    },
    secondary: {
      main: colors.contrast,
    },
    error: {
      main: colors.error,
    },
  },
  shadows: _.map(_.range(25), (size) =>
    size === 0 ? 'none' : `3px 3px 10px rgba(12,17,22,0.5), -3px -3px 10px rgba(79,93,103,0.5)`,
  ) as Shadows,
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
    MuiTextField: {
      color: 'secondary',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width: '10px',
          height: '10px',
        },
        '*::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,.1)',
          borderRadius: '10px',
        },
        '*::-webkit-calendar-picker-indicator': {
          filter: 'invert(1)',
        },
      },
    },

    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      containedPrimary: {
        borderRadius: '1rem',
        color: colors.contrast,
        background:
          'transparent linear-gradient(131deg, #263846 0%, #243542 45%, #22323E 100%) 0% 0% no-repeat padding-box',
        fontWeight: 'normal',
        '&:hover': {
          background: 'rgb(25, 36, 45)',
        },
      },
      containedSecondary: {
        background:
          'transparent linear-gradient(172deg, #00FFF1 0%, #00EBFF 100%) 0% 0% no-repeat padding-box',
        '&:hover': {
          background:
            'transparent linear-gradient(172deg, #00FFF2 0%, #00FFF2 100%) 0% 0% no-repeat padding-box',
        },
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
          '-webkit-text-fill-color': colors.contrast,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: '6px',
      },
    },
    MuiBreadcrumbs: {
      li: {
        fontSize: '0.8rem',
      },
    },
    MuiDialogActions: {
      root: {
        backgroundColor: colors.light,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: colors.contrast,
        color: colors.dark,
      },
      deleteIcon: {
        color: colors.dark,
        fill: colors.dark,
      },
    },
    /**
     * MuiPickers overrides
     * https://material-ui-pickers.dev/guides/css-overrides#typescript
     **/
    MuiPickersDay: {
      current: {
        color: colors.textLight,
        border: `1px solid ${colors.contrast}`,
      },
      daySelected: {
        color: colors.dark,
        backgroundColor: colors.contrast,
        '&:hover': {
          color: colors.dark,
          backgroundColor: colors.contrast,
        },
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        margin: '1rem',
        marginTop: '1rem',
        marginBottom: 'inherit', // Override remote margin bottom
      },
      daysHeader: {
        marginTop: '1rem',
      },
      transitionContainer: {
        '& > p': {
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'uppercase',
        },
      },
      iconButton: {
        boxShadow: '3px 3px 10px rgba(12,17,22,0.5), -3px -3px 10px rgba(79,93,103,0.5)',
        borderRadius: 8,
      },
    },
    MuiPickersCalendar: {
      transitionContainer: {
        marginBottom: '1rem',
      },
    },
    MuiPickersClockPointer: {
      thumb: { backgroundColor: colors.contrast },
      pointer: { backgroundColor: colors.contrast },
    },
    MuiPickersClockNumber: {
      clockNumberSelected: {
        color: colors.dark,
        backgroundColor: colors.contrast,
      },
    },
  },
})

export default responsiveFontSizes(theme)
