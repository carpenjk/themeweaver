import { withThemeweaver, variant, value } from '../index';

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
    lineHeights: ['normal', 2, 3],
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
    breakpoints: ['0','40em', '52em', '64em', '80em'],
  },
  {
    // beginning of themeweaver asignments *****************
    document: {
      paddingLeft: value('5px'),
      paddingRight: 2,
    },
    content: {
      paddingLeft: 2,
    },
    button: {
      ...variant('nav', {
        height: value('50px'),
        width: value('50px'),
        color: 'action[1]',
      }),
    },
    nav: {
      ...variant('main', {
        backgroundColor: value('#C6D8FF'),
        border: value('dashed blue'),
        borderTop: value('solid blue'),
        borderRight: value('solid'),
        borderBottom: value('dashed'),
        borderLeft: value('solid red'),
        borderColor: value('#F8F8F8'),
        borderRadius: value('5px'),
        borderStyle: value('dashed solid'),
        borderWidth: value('5px'),
        boxShadow: value('1px 1px 1px 1px blue'),
        color: value('red'),
        fontFamily: value("'Poppins', sans-serif"),
        fontSize: value('18px'),
        fontWeight: value('500'),
        height: value('80px'),
        lineHeight: value('3'),
        letterSpacing: value('2.5'),
        margin: value('50px'),
        marginTop: value('51px'),
        marginRight: value('52px'),
        marginBottom: value('53px'),
        marginLeft: value('54px'),
        maxHeight: value('55px'),
        maxWidth: value('56px'),
        minHeight: value('57px'),
        minWidth: value('58px'),
        padding: value('59px'),
        paddingTop: value('60px'),
        paddingRight: value('61px'),
        paddingBottom: value('62px'),
        paddingLeft: value('63px'),
        textShadow: value('1px 2px 1px 2px blue'),
        transition: value('top 500ms ease-in-out'),
        width: value('70px'),
        zIndex: value('1'),
      }),
      ...variant('hover', {
        color: 'action[0]',
        backgroundColor: 'action[0]',
        fontFamily: 'poppins',
        fontSize: 3,
        fontWeight: 'bold',
        padding: 6,
      }),
    },
  }
);

export default theme;