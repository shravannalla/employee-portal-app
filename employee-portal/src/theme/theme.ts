import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface PaletteColor {
    600: string
    500: string
    400: string
    300: string
    200: string
    100: string
  }

  interface CustomPalette {
    accent: {
      lavender: string
      blue: string
      yellow: string
      pink: string
    }
    elevation: {
      color1: string
      color2: string
    }
  }

  interface CustomTypography {
    caption1: React.CSSProperties
    caption2: React.CSSProperties
    caption3: React.CSSProperties
    caption4: React.CSSProperties
    title: React.CSSProperties
  }

  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
  interface TypographyVariants extends CustomTypography {}
  interface TypographyVariantsOptions extends CustomTypography {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    caption1: true
    caption2: true
    caption3: true
    caption4: true
    title: true
  }
}

export const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#6C5DD3',
      '600': '#393552',
      '400': '#B4A9FF',
      '500': '#100F1C',
    },
    text: {
      primary: '#E8E7F0',
      secondary: '#C9C8CC',
      disabled: '#A5A5A6',
    },
    grey: {
      '800': '#19181C',
      '700': '#727080',
      '600': '#413F4D',
      '500': '#E8E8E9',
      '400': '#FFFFFF',
      '100': '#262529',
      '200': '#3A3A3D',
      '300': '#28272B',
    },
    accent: {
      lavender: '#CFC8FF',
      blue: '#A0D7E7',
      yellow: '#E5CB9B',
      pink: '#E39AB2',
    },
    elevation: {
      color1: '#201F24',
      color2: '#2D2D30',
    },
    background: {
      default: '#040407',
    },
  },
  typography: {
    fontFamily: 'Gilroy-Regular',
    h1: {
      fontSize: '1.85rem',
      fontWeight: 600,
      lineHeight: '2.325rem',
    },
    h2: {
      fontSize: '1.6rem',
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: '1.913rem',
    },
    h3: {
      fontSize: '1.225rem',
      fontWeight: 500,
      fontStyle: 'normal',
      lineHeight: '1.788rem',
    },
    body1: {
      fontSize: '1.1rem',
      fontWeight: 500,
      fontStyle: 'normal',
      lineHeight: '1.475rem',
    },
    body2: {
      fontSize: '0.975rem',
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: '1.163rem',
    },
    subtitle1: {
      fontSize: '1.1rem',
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: '1.288rem',
    },
    subtitle2: {
      fontSize: '0.975rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '0.975rem',
    },
    caption1: {
      fontFamily: 'Gilroy-Regular',
      fontSize: '1.6rem',
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: '1.975rem',
    },
    caption2: {
      fontFamily: 'Gilroy-Regular',
      fontSize: '1.1rem',
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: '1.475rem',
    },
    caption3: {
      fontFamily: 'Gilroy-Regular',
      fontSize: '1.1rem',
      fontWeight: 500,
      fontStyle: 'normal',
      lineHeight: '1.475rem',
    },
    caption4: {
      fontFamily: 'Gilroy-Regular',
      fontSize: '0.85rem',
      fontWeight: 500,
      fontStyle: 'normal',
      lineHeight: '1.01rem',
    },
    title: {
      fontFamily: 'Gilroy-Regular',
      fontSize: '2.35rem',
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: '2.725rem',
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#262529',
          borderRadius: '0.85rem',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(16px)',
          background: 'rgba(16, 15, 28, 0.72)',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        displayedRows: {
          fontFamily: 'Gilroy-Regular',
          fontSize: '1.1rem',
          fontWeight: 700,
          fontStyle: 'normal',
          lineHeight: '1.475rem',
          color: '#E8E7F0',
        },
        actions: {
          color: '#E8E7F0',
        },
      },
    },
  },
})
