import responsiveValuesTheme from '../test_themes/responsiveValuesTheme';

import {
  getBackgroundColor,
  getBorder,
  getBorderTop,
  getBorderRight,
  getBorderBottom,
  getBorderLeft,
  getBorderColor,
  getBorderRadius,
  getBorderStyle,
  getBorderWidth,
  getBoxShadow,
  getColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getHeight,
  getLineHeight,
  getLetterSpacing,
  getMargin,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getMaxWidth,
  getMaxHeight,
  getMinHeight,
  getMinWidth,
  getPadding,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getPaddingLeft,
  getTextShadow,
  getTransitions,
  getWidth,
  getZIndex,
} from '../index';

// Function: getBackgroundColor
test('Responsive Value Test: undefined / getBackgroundColor: #C6D8FF', () => {
  expect(
    getBackgroundColor('nav.main', 'blue')({ theme: responsiveValuesTheme })
  ).toStrictEqual('#C6D8FF');
});

test('Responsive Value Test: br value / getBackgroundColor: #F8F8F8', () => {
  expect(
    getBackgroundColor('nav.main', 'blue')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('#F8F8F8');
});

// Function: getBorder
test('Responsive Value Test / getBorder: dashed red', () => {
  expect(
    getBorder('nav.main', 'thick green')({ theme: responsiveValuesTheme })
  ).toStrictEqual('1px solid');
});
test('Responsive Value Test: br value / getBorder: thick double #32a1ce', () => {
  expect(
    getBorder('nav.main', 'thick green')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('1px dashed');
});

// Function: getBorderTop
test('Responsive Value Test / getBorderTop: dashed red', () => {
  expect(
    getBorderTop('nav.main', 'thick green')({ theme: responsiveValuesTheme })
  ).toStrictEqual('dashed red');
});
test('Responsive Value Test: br value / getBorderTop: thick double #32a1ce', () => {
  expect(
    getBorderTop('nav.main', 'thick green')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('thick double #32a1ce');
});
// Function: getBorderRight
test('Responsive Value Test / getBorderRight: dashed red', () => {
  expect(
    getBorderRight('nav.main', 'thick green')({ theme: responsiveValuesTheme })
  ).toStrictEqual('dashed red');
});
test('Responsive Value Test: br value / getBorderRight: thick double #32a1ce', () => {
  expect(
    getBorderRight('nav.main', 'thick green')(
      { theme: responsiveValuesTheme },
      1
    )
  ).toStrictEqual('thick double #32a1ce');
});
// Function: getBorderBottom
test('Responsive Value Test / getBorderBottom: dashed red', () => {
  expect(
    getBorderBottom('nav.main', 'thick green')({ theme: responsiveValuesTheme })
  ).toStrictEqual('dashed red');
});
test('Responsive Value Test: br value / getBorderBottom: thick double #32a1ce', () => {
  expect(
    getBorderBottom('nav.main', 'thick green')(
      { theme: responsiveValuesTheme },
      1
    )
  ).toStrictEqual('thick double #32a1ce');
});
// Function: getBorderLeft
test('Responsive Value Test / getBorderLeft: dashed red', () => {
  expect(
    getBorderLeft('nav.main', 'thick green')({ theme: responsiveValuesTheme })
  ).toStrictEqual('dashed red');
});
test('Responsive Value Test: br value / getBorderLeft: thick double #32a1ce', () => {
  expect(
    getBorderLeft('nav.main', 'thick green')(
      { theme: responsiveValuesTheme },
      1
    )
  ).toStrictEqual('thick double #32a1ce');
});
// Function: getBorderColor
test('Responsive Value Test / getBorderColor: #F8F8F8', () => {
  expect(
    getBorderColor('nav.main', 'green')({ theme: responsiveValuesTheme })
  ).toStrictEqual('#F8F8F8');
});
test('Responsive Value Test: br value / getBorderColor: #C6D8FF', () => {
  expect(
    getBorderColor('nav.main', 'green')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('#C6D8FF');
});
// Function: getBorderRadius
test('Responsive Value Test / getBorderRadius: 0px', () => {
  expect(
    getBorderRadius('nav.main', '10px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getBorderRadius: 5px', () => {
  expect(
    getBorderRadius('nav.main', '10px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('5px');
});
// Function: getBorderStyle
test('Responsive Value Test / getBorderStyle: none', () => {
  expect(
    getBorderStyle('nav.main', 'dashed')({ theme: responsiveValuesTheme })
  ).toStrictEqual('none');
});
test('Responsive Value Test: br value / getBorderStyle: solid', () => {
  expect(
    getBorderStyle('nav.main', 'dashed')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('solid');
});
// Function: getBorderWidth
test('Responsive Value Test / getBorderWidth: 3px 5px 3px 5px', () => {
  expect(
    getBorderWidth('nav.main', '10px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('3px 5px 3px 5px');
});
test('Responsive Value Test: br value / getBorderWidth: 3px', () => {
  expect(
    getBorderWidth('nav.main', '10px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('3px');
});
// Function: getBoxShadow
test('Responsive Value Test / getBoxShadow: 1px 1px 2px pink', () => {
  expect(
    getBoxShadow(
      'nav.main',
      '10px 5px 5px red'
    )({ theme: responsiveValuesTheme })
  ).toStrictEqual('1px 1px 2px pink');
});
test('Responsive Value Test: br value / getBoxShadow: 5px 5px #558ABB', () => {
  expect(
    getBoxShadow('nav.main', '10px 5px 5px red')(
      { theme: responsiveValuesTheme },
      1
    )
  ).toStrictEqual('5px 5px #558ABB');
});
// Function: getColor
test('Responsive Value  / getColor: #E5707A', () => {
  expect(
    getColor('nav.main', 'blue')({ theme: responsiveValuesTheme })
  ).toStrictEqual('#E5707A');
});
test('Responsive Value: br value  / getColor: #F6E8E8', () => {
  expect(
    getColor('nav.main', 'blue')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('#F6E8E8');
});
// Function: getFontFamily
test("Responsive Value Test / getFontFamily: 'Poppins', sans-serif", () => {
  expect(
    getFontFamily(
      'nav.main',
      "'Roboto', sans-serif"
    )({ theme: responsiveValuesTheme })
  ).toStrictEqual("'Poppins', sans-serif");
});
test("Responsive Value Test: br value / getFontFamily: 'Roboto', sans-serif", () => {
  expect(
    getFontFamily('nav.main', "'Roboto', sans-serif")(
      { theme: responsiveValuesTheme },
      1
    )
  ).toStrictEqual("'Roboto', sans-serif");
});
// Function: getFontSize
test('Responsive Value Test / getFontSize: 18px', () => {
  expect(
    getFontSize('nav.main', '12px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('18px');
});
test('Responsive Value Test: br value / getFontSize: 24px', () => {
  expect(
    getFontSize('nav.main', '12px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('24px');
});
// Function: getFontWeight
test('Responsive Value Test / getFontWeight: 700', () => {
  expect(
    getFontWeight('nav.main', 'regular')({ theme: responsiveValuesTheme })
  ).toStrictEqual('700');
});
test('Responsive Value Test: br value / getFontWeight: 400', () => {
  expect(
    getFontWeight('nav.main', 'bold')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('400');
});
// Function: getHeight
test('Responsive Value Test / getHeight: 0px', () => {
  expect(
    getHeight('nav.main', '70px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getHeight: 80px', () => {
  expect(
    getHeight('nav.main', '70px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('80px');
});
// Function: getLineHeight
test('Responsive Value Test / getLineHeight: 2', () => {
  expect(
    getLineHeight('nav.main', '2.5')({ theme: responsiveValuesTheme })
  ).toStrictEqual('2');
});
test('Responsive Value Test: br value / getLineHeight: 3px', () => {
  expect(
    getLineHeight('nav.main', '2.5')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('3px');
});
// Function: getLetterSpacing
test('Responsive Value Test / getLetterSpacing: normal', () => {
  expect(
    getLetterSpacing('nav.main', '2px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('normal');
});
test('Responsive Value Test: br value / getLetterSpacing: .2rem', () => {
  expect(
    getLetterSpacing('nav.main', '2px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('.2rem');
});
// Function: getMargin
test('Responsive Value Test / getMargin: 16px', () => {
  expect(
    getMargin('nav.main', '5px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('16px');
});
test('Responsive Value Test: br value / getMargin: 20px', () => {
  expect(
    getMargin('nav.main', '5px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('20px');
});
// Function: getMarginTop
test('Responsive Value Test / getMarginTop: 0px', () => {
  expect(
    getMarginTop('nav.main', '5px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getMarginTop: 4px', () => {
  expect(
    getMarginTop('nav.main', '5px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('4px');
});
// Function: getMarginRight
test('Responsive Value Test / getMarginRight: 0px', () => {
  expect(
    getMarginRight('nav.main', '5px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getMarginRight: 4px', () => {
  expect(
    getMarginRight('nav.main', '5px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('4px');
});
// Function: getMarginBottom
test('Responsive Value Test / getMarginBottom: 8px', () => {
  expect(
    getMarginBottom('nav.main', '5px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('8px');
});
test('Responsive Value Test: br value / getMarginBottom: 32px', () => {
  expect(
    getMarginBottom('nav.main', '5px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('32px');
});
// Function: getMarginLeft
test('Responsive Value Test / getMarginLeft: 0px', () => {
  expect(
    getMarginLeft('nav.main', '5px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getMarginLeft: 4px', () => {
  expect(
    getMarginLeft('nav.main', '5px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('4px');
});
// Function: getMaxHeight
test('Responsive Value Test / getMaxHeight: 0px', () => {
  expect(
    getMaxHeight('nav.main', '50px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getMaxHeight: 100%', () => {
  expect(
    getMaxHeight('nav.main', '50px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('100%');
});
// Function: getMaxWidth
test('Responsive Value Test / getMaxWidth: 0px', () => {
  expect(
    getMaxWidth('nav.main', '50px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getMaxWidth: 100%', () => {
  expect(
    getMaxWidth('nav.main', '50px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('100%');
});
// Function: getMinHeight
test('Responsive Value Test / getMinHeight: 0px', () => {
  expect(
    getMinHeight('nav.main', '50px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getMinHeight: 100%', () => {
  expect(
    getMinHeight('nav.main', '50px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('100%');
});
// Function: getMinWidth
test('Responsive Value Test / getMinWidth: 0px', () => {
  expect(
    getMinWidth('nav.main', '50px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getMinWidth: 100%', () => {
  expect(
    getMinWidth('nav.main', '50px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('100%');
});
// Function: getPadding
test('Responsive Value Test / getPadding: 16px', () => {
  expect(
    getPadding('nav.main', '50px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('16px');
});
test('Responsive Value Test: br value / getPadding: 20px', () => {
  expect(
    getPadding('nav.main', '50px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('20px');
});
// Function: getPaddingTop
test('Responsive Value Test / getPaddingTop: 0px', () => {
  expect(
    getPaddingTop('nav.main', '50px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getPaddingTop: 4px', () => {
  expect(
    getPaddingTop('nav.main', '50px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('4px');
});
// Function: getPaddingRight
test('Responsive Value Test / getPaddingRight: 0px', () => {
  expect(
    getPaddingRight('nav.main', '50px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getPaddingRight: 4px', () => {
  expect(
    getPaddingRight('nav.main', '50px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('4px');
});
// Function: getPaddingBottom
test('Responsive Value Test / getPaddingBottom: 0px', () => {
  expect(
    getPaddingBottom('nav.main', '50px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getPaddingBottom: 4px', () => {
  expect(
    getPaddingBottom('nav.main', '50px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('4px');
});
// Function: getPaddingLeft
test('Responsive Value Test / getPaddingLeft: 0px', () => {
  expect(
    getPaddingLeft('nav.main', '50px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getPaddingLeft: 4px', () => {
  expect(
    getPaddingLeft('nav.main', '50px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('4px');
});
// Function: getTextShadow
test('Responsive Value Test / getTextShadow: 1px 1px 2px pink', () => {
  expect(
    getTextShadow(
      'nav.main',
      '10px 5px #558ABB'
    )({ theme: responsiveValuesTheme })
  ).toStrictEqual('1px 1px 2px pink');
});
test('Responsive Value Test: br value / getTextShadow: 5px 5px #558ABB', () => {
  expect(
    getTextShadow('nav.main', '10px 5px #558ABB')(
      { theme: responsiveValuesTheme },
      1
    )
  ).toStrictEqual('5px 5px #558ABB');
});
// Function: getTransition
test('Responsive Value Test / getTransition: top 500ms ease-in-out', () => {
  expect(
    getTransitions({
      style: 'top',
      path: 'nav.main',
      fallback: 'top 500ms ease',
    })({
      theme: responsiveValuesTheme,
    })
  ).toStrictEqual('top 500ms ease-in-out');
});
test('Responsive Value Test: br value / getTransition: left 500ms ease', () => {
  expect(
    getTransitions({
      style: 'top',
      path: 'nav.main',
      fallback: 'top 500ms ease',
    })(
      {
        theme: responsiveValuesTheme,
      },
      1
    )
  ).toStrictEqual('left 500ms ease');
});
// Function: getWidth
test('Responsive Value Test / getWidth: 0px', () => {
  expect(
    getWidth('nav.main', '100px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0px');
});
test('Responsive Value Test: br value / getWidth: 100%', () => {
  expect(
    getWidth('nav.main', '100px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('100%');
});
// Function: getZIndex
test('Responsive Value Test / getZIndex: 0', () => {
  expect(
    getZIndex('nav.main', '1')({ theme: responsiveValuesTheme })
  ).toStrictEqual('0');
});
test('Responsive Value Test: br value / getZIndex: 1', () => {
  expect(
    getZIndex('nav.main', '2')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('1');
});
