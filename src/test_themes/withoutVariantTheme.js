import { withThemeweaver, value } from '../index';

export const theme = withThemeweaver(
  {
    colors: {
      primary: '#7789C8',
      secondary: '#C6D8FF',
      action: ['#F6E8E8', '#E5707A'],
      lightText: '#979797',
      mainText: '#444649',
      secondaryText: '#E5707A',
      lightBackground: '#F8F8F8',
      disabledBackground: '#E2E2E2',
      white: '#ffffff',
    },
    fonts: {
      poppins: "'Poppins', sans-serif",
      roboto: "'Roboto', sans-serif",
      openSans: "'Open Sans', sans-serif",
    },
    fontSizes: [10, 12, 14, 18, 24, 32],
    fontWeights: {
      regular: '400',
      bold: '700',
    },
    lineHeights: ['normal', 2, '3'],
    letterSpacings: ['normal', '.2rem', 1],
    sizes: [0, '100%', 80],
    space: [0, 4, 8, 16, 20, 32, 64],
    borders: ['dashed red', 'thick double #32a1ce'],
    borderWidths: ['3px 5px 3px 5px', '3px'],
    borderStyles: ['none', 'solid'],
    radii: [0, '5px', '20px'],
    shadows: ['1px 1px 2px pink', '5px 5px #558ABB'],
    zIndices: [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '999999',
    ],
    transitions: {
      down: 'top 500ms ease-in-out',
      left: 'left 500ms ease',
      right: 'right 500ms ease',
      colorBig: 'color 500ms ease',
      padding: 'padding 500ms ease',
    },
    breakpoints: ['0', '40em', '52em', '64em', '80em'],
  },
  {
    // beginning of themeweaver asignments *****************
    document: {
      paddingLeft: 2,
      paddingRight: 2,
    },
    content: {
      paddingLeft: 2,
    },
    nav: {
      backgroundColor: 'secondary',
      border: [0, 1],
      borderTop: [1, 0],
      borderRight: 0,
      borderBottom: 1,
      borderLeft: 1,
      borderColor: 'lightBackground',
      borderRadius: 1,
      borderStyle: 1,
      borderWidth: 0,
      boxShadow: 1,
      color: ['action[1]', 'secondary'],
      fontFamily: 'poppins',
      fontSize: 3,
      fontWeight: 'bold',
      height: [1, 2],
      lineHeight: 2,
      letterSpacing: 1,
      margin: 4,
      marginTop: 0,
      marginRight: 1,
      marginBottom: 5,
      marginLeft: 2,
      maxHeight: 1,
      maxWidth: [1, 2],
      minHeight: 1,
      minWidth: 1,
      padding: value('1px 2px 1px 2px'),
      paddingTop: [1, 3],
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      textShadow: 1,
      transition: { top: ['down', 'left'], left: 'left' },
      width: 2,
      zIndex: 0,
    },
  }
);

export default theme;