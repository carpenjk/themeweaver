import { breakpoint } from '@carpenjk/prop-x/css';
import singleValuesTheme from '../test_themes/singleValuesTheme';
import withoutVariantTheme from '../test_themes/withoutVariantTheme';
import responsiveValuesTheme from '../test_themes/responsiveValuesTheme';
import explicitValuesTheme from '../test_themes/explicitValuesTheme';
import missingValuesTheme from '../test_themes/missingValuesTheme';
import {
  getBackgroundColor,
  getColor,
  getFontSize,
  getMarginTop,
  getMaxHeight,
  getPadding,
  getPaddingTop,
  getTransitions,
  getWidth,
  getZIndex,
  toggleTransitions,
} from '../index';

// Fallback Tests
test('Fallback Test: Single Value  / getBackgroundColor: blue', () => {
  expect(
    getBackgroundColor('nav', 'blue')({ theme: singleValuesTheme })
  ).toStrictEqual('blue');
});
test('Fallback Test: Without Variant  / getMaxHeight: 100px', () => {
  expect(
    getMaxHeight('invalid', '100px')({ theme: withoutVariantTheme })
  ).toStrictEqual('100px');
});
test('Fallback Test: Responsive Values  / getPaddingTop: 150px', () => {
  expect(
    getPaddingTop('invalid', '150px')({ theme: responsiveValuesTheme })
  ).toStrictEqual('150px');
});
test('Fallback Test: Responsive Values with br  / getPaddingTop: 150px', () => {
  expect(
    getPaddingTop('invalid', '150px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('150px');
});
test('Fallback Test: Explicit Values  / getPaddingTop: 150px', () => {
  expect(
    getPaddingTop('invalid', '150px')({ theme: explicitValuesTheme })
  ).toStrictEqual('150px');
});

test('Fallback Test: Single Value   / getTransitions: top 500ms ease', () => {
  expect(
    getTransitions({
      style: 'top',
      path: 'invalid',
      fallback: 'top 500ms ease',
    })({ theme: singleValuesTheme })
  ).toStrictEqual('top 500ms ease');
});

//missing style assignment
test('Missing Style Assignment Test: Single Value   / getMarginTop: 15px', () => {
  expect(
    getMarginTop('nav.main', '15px')({ theme: missingValuesTheme })
  ).toStrictEqual('15px');
});
test('Missing Style Assignment Test: missing transition style prop / getTransitions: 15px', () => {
  expect(
    getTransitions({
      style: 'invalid',
      path: 'nav.main',
      fallback: 'top 500ms ease',
    })({ theme: singleValuesTheme })
  ).toStrictEqual('top 500ms ease');
});
test('Missing Style Assignment Test: missing transition / getTransitions: 15px', () => {
  expect(
    getTransitions({
      style: 'color',
      path: 'nav.main',
      fallback: 'top 500ms ease',
    })({ theme: missingValuesTheme })
  ).toStrictEqual('top 500ms ease');
});

test('Missing Style Assignment TestNo Key Assignment fallback / getZindex 999', () => {
  expect(
    getZIndex('banner', '999')({ theme: missingValuesTheme })
  ).toStrictEqual('999');
});

//ToggleTransitions tests

test('Toggle Transitions Test: multiple ', () => {
  expect(
    toggleTransitions(
      [
        {
          style: 'padding',
          value: getPadding('nav.main', '20px'),
          transition: 'nav.main',
          fallback: 'padding 1000ms ease',
        },
        {
          style: 'color',
          value: getColor('nav.main', 'orange'),
          transition: 'nav.main',
          fallback: 'color 1000ms ease',
        },
      ],
      'tw-transition'
    )({ theme: singleValuesTheme })
  ).toStrictEqual(
    `&.tw-transition {
    padding: 20px;
    color: #E5707A;
    transition: padding 500ms ease, color 500ms ease;
}`
  );
});

test('Toggle Transitions Test: Single Object', () => {
  expect(
    toggleTransitions(
      {
        style: 'padding',
        value: getPadding('nav.main', '20px'),
        transition: 'nav.main',
        fallback: 'padding 1000ms ease',
      },
      'tw-transition'
    )({ theme: singleValuesTheme })
  ).toStrictEqual(
    `&.tw-transition {
    padding: 20px;
    transition: padding 500ms ease;
}`
  );
});

//breakpoint tests
test('breakpoint Test:  / getColor: #F6E8E8 ', () => {
  expect(
    breakpoint(1)`
      color: ${getColor('nav.main', 'blue')};
      font-size: ${getFontSize('nav.main', 'inherit')};`({
      theme: responsiveValuesTheme,
    })
  ).toStrictEqual(`@media(min-Width: 40em){
      color: #F6E8E8;
      font-size: 24px;
}`);
});

test('breakpoint Test:  / no responsive values ', () => {
  expect(
    breakpoint(1)`
      color: ${getColor('nav.main', 'blue')};
      font-size: ${getFontSize('nav.main', 'inherit')};`({
      theme: singleValuesTheme,
    })
  ).toStrictEqual(`@media(min-Width: 40em){
      color: #E5707A;
      font-size: 18px;
}`);
});

test('breakpoint Test:  / no style assignment ', () => {
  expect(
    breakpoint(1)`
      color: ${getColor('nav.main', 'blue')};
      font-size: ${getFontSize('nav.main', 'inherit')};`({
      theme: missingValuesTheme,
    })
  ).toStrictEqual(`@media(min-Width: 40em){
      color: blue;
      font-size: inherit;
}`);
});

test('breakpoint Test: comprehensive', () => {
  expect(
    breakpoint(1)`
      color: ${getColor('nav.main', 'blue')};
      font-size: ${getFontSize('nav.main', 'inherit')};
      ${toggleTransitions(
        [
          {
            style: 'color',
            value: getColor('nav.hover', 'salmon'),
            transition: 'nav.main',
            fallback: 'color 100ms ease',
          },
          {
            style: 'padding',
            value: getPadding('nav.hover', '50px'),
            transition: 'nav.main',
            fallback: 'padding 100ms ease',
          },
        ],
        'tw-transition'
      )}`({
      theme: responsiveValuesTheme,
    })
  ).toStrictEqual(`@media(min-Width: 40em){
      color: #F6E8E8;
      font-size: 24px;
      &.tw-transition {
    color: #C6D8FF;
    padding: 64px;
    transition: color 500ms ease, padding 100ms ease;
}
}`);
});

//Responsive + explicit values test
test('Fallback Test: Responsive Values  / getPaddingTop: 150px', () => {
  expect(
    getWidth('nav.explicitTest', '150px')({ theme: responsiveValuesTheme }, 1)
  ).toStrictEqual('auto');
});
