import { createTheme, Shadows } from '@mui/material';

// Custom Theme
const defaultShadows = [...createTheme().shadows].map((shadow, i) => {
  switch (i) {
    case 1:
      return '0 -5px 22px rgba(0, 0, 0, 0.16);';
    case 2:
      return '0 -5px 22px rgba(0, 0, 0, 0.16);';
    case 8:
      return '0 -5px 25px rgba(0, 0, 0, 0.07);';
    case 9:
      return '0 -5px 25px rgba(0, 0, 0, 0.07);';
    default:
      return shadow;
  }
}) as Shadows;

const customTheme = createTheme({
  palette: {
    primary: { main: '#FAC406' },
    success: { main: '#47BB98' },
    // action: {
    //   hover: '#F6F6F4',
    // },
  },
  typography: { fontFamily: 'Inter,Roboto,Helvetica,Arial,sans-serif' },
  shadows: defaultShadows,
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => {
    //       if (ownerState.variant === 'contained' && ownerState.color === 'inherit') {
    //         return { backgroundColor: '#F7F7F8' };
    //       }
    //     },
    //   },
    // },
    MuiSelect: {
      // defaultProps: {
      //   displayEmpty: true,
      //   variant: 'outlined',
      // },
      styleOverrides: {},
    },
  },
});

export default customTheme;
