# Themeweaver

A library for creating and using themes interchangeably in third party components.

## Introduction

Themeweaver is a perspective on styling components as part of a broader effort to
make 100% reusable and interchangeable components. Themeweaver provides an interface
for passing styles to components making it an excellent choice for creating a
collection of components controlled by a single theme. It works as an abstraction
on top of styling libraries such as styled-components and emotion for a more
advanced theming utility and is enhanced by the [prop-x](https://github.com/carpenjk/prop-x) library. One of the objectives of component based systems is
reusability of code. However, oftentimes components are used as a starting point
and then modified for each project. Additionally, while theming has been
introduced in common styling libraries, there are limited standards and tools
for creating and using themes across the component ecosystem. Themeweaver aims
to provide infrastructure needed to solve these problems.

## Features

- **Semantic** Themeweaver encourages defining standard semantic customization points across components that are similar to how html tags define a document.
- **Universal:** Themeweaver creates and common interface for passing themes between components while adding additional features to common css-in-js libraries
- **Responsive:** Themeweaver contains tools for using breakpoints and dynamically selecting theme values based on the current viewport width.
- **Variants:** Themeweaver contains tools for creating and consuming variants within the theme.
- **Lightweight:** Themeweaver is a standalone library and is written to modern javascript standards.
- **Separation of Concerns:** Themeweaver gives more responsibility to the theme definition compared to other solutions that depend on style props applied to base level components. This is purposeful to facilitate the larger goal of 100% reusable and interchangeable high level components.

## Theme Specification

Themeweaver utilizes [System UI](https://system-ui.com/) specification for theme structure and functionality.

## Use Case

- **Agency Component Libraries:** Themeweaver can be used to speed up prototyping,
  development, and testing for Agencies. When utilized to build a reusable component
  library in combination with a standard set of semantic customization points, it
  creates a highly customizable solution with minimal touchpoints.
- **Feelancers** Themeweaver can be used by freelancers with the same benefits as
  agencies.
- **Corporate Development Teams:** Themeweaver can be used by development teams in
  combination with a standard set of semantic customization points to maintain global
  themes across the they're component landscape.
- **Third Party Components** In combination with a global specification for
  semantic customization points, Third Party Components can use Themeweaver to create
  an ecosystem of interchangeable components without the need for code modification.

# License

[Apache License 2.0](./LICENSE)

# Get Started

## Install

```js
    npm install carpenjk/themeweaver carpenjk/prop-x
```

## Create Theme

Utilize a theme file and pass it to components as your normally would with styled-components or emotion.

#### Import

```js
import { withThemeweaver, variant } from 'themeweaver';
```

#### Define

```js
export const theme = withThemeweaver(
  //System UI compliant theme
  {
    colors: {
      primary: '#7789C8',
      secondary: '#C6D8FF',
      action: '#E5707A',
      lightText: '#979797',
      mainText: '#444649',
    },
    fonts: {
      h1: "'Poppins', sans-serif",
      button: "'Roboto', sans-serif",
      text: "'Open Sans', sans-serif",
    },
    fontSizes: [10, 12, 14, 18, 24, 32],
    fontWeights: {
      regular: 400,
      bold: 700,
    },
    sizes: [0, '100%'],
    space: [0, 4, 8, 16, 20, 32, 64],
    breakpoints: ['40em', '52em', '64em', '80em'],
  },
  {
    // beginning of themeweaver semantic key styles *****************
    nav: {
      ...variant('main', {
        color: ['primary', 'mainText'],
        backgroundColor: 'secondary',
        fontFamily: 'h1',
        fontSize: 3,
        fontWeight: 'bold',
        padding: [2, 5],
      }),
    },
  }
);
```

## Use Theme

#### Import

```js
import { getColor, getBackgroundColor, getPadding } from 'themeweaver';
import { breakpoint } from '@carpenjk/prop-x';
import styled from 'styled-components';
```

#### Usage

##### Static keys

```js
const StyledLink = styled.a`
  color: ${getColor('nav.main', 'yellow')};
  background-color: ${getBackgroundColor('nav.main', 'grey')};
  padding: ${getPadding('nav.main', '20px')};

  ${breakpoint(1)`
      padding: ${getPadding('nav.main', '20px')};
      `}
`;
```

##### Dynamic keys
Passing an empty object as the first parameter of the get functions causes them to look for the tw property for semkey object containing keys for semKey, variant (optional).

```js
import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x';

const StyledLink = styled.a`
  color: ${getColor({}, 'yellow')};
  background-color: ${getBackgroundColor({}, 'grey')};
  padding: ${getPadding({}, '20px')};

  ${breakpoint(1)`
      padding: ${getPadding({}, '20px')};
      `}
`;

const DEFAULT_TW = {
  tw: {semKey: "nav", variant: "main"}
}

const FancyLink = ({tw}) => {
 const mergedTw = { ...DEFAULT_TW, ...tw };
 return (<StyledLink tw={mergedTw} />)
}
```
##### suffixes
A suffix can be passed inside of the path object to apply to the theme query. The following code defining a suffix is the same as using a path of 'nav.main_disabled'.

```js
import styled from 'styled-components';
import {condition} from '@carpenjk/prop-x';


const StyledLink = styled.a`
  color: ${getColor({}, 'yellow')};
  ${condition('disabled)`
      color: ${getColor({suffix: '_disabled'}, '20px')};
    `}
`;

const DEFAULT_TW = {
  tw: {semKey: "nav", variant: "main"}
}

const FancyLink = ({tw}) => {
 const mergedTw = { ...DEFAULT_TW, ...tw };
 return (<StyledLink tw={mergedTw} />)
}
`
// 
```

# API: Theme Creation

## withThemeweaver

This is a wrapper function that recieves a theme object following the [System UI](https://system-ui.com/)
theme specification and a config object which defines style groupings within the theme. The
function creates and returns a shallow copy of the theme, modifying
it with aliases which are later utilized to intelligently access the theme.

The Themeweaver config can be configured with and without the use of variants,
but must contain at least one semantic group. Together, the semantic group
and the variant becomes the semantic key which is used to intellegently
retrieve styles within components using Themeweaver.

#### Example

```js
import { withThemeweaver } from 'themeweaver';

export const theme = withThemeweaver(
  //System UI compliant theme
  {
    colors: {
      primary: '#7789C8',
      secondary: '#C6D8FF',
      action: '#E5707A',
      lightText: '#979797',
      mainText: '#444649',
    },
    fonts: {
      h1: "'Poppins', sans-serif",
      button: "'Roboto', sans-serif",
      text: "'Open Sans', sans-serif",
    },
    fontSizes: [10, 12, 14, 18, 24, 32],
    fontWeights: {
      regular: 400,
      bold: 700,
    },
    sizes: [0, '100%'],
    space: [0, 4, 8, 16, 20, 32, 64],
    breakpoints: ['40em', '52em', '64em', '80em'],
  },
  {
    // beginning of Themeweaver config with semantic key styles *****************
    nav: {
      color: ['primary', 'mainText'],
      backgroundColor: 'secondary',
      fontFamily: 'h1',
      fontSize: 3,
      fontWeight: 'bold',
      padding: 2,
    },
  }
);

export default theme;
```

##### Theme Keys with Array Scales

The [System UI](https://system-ui.com/) theme specification utilizes scales which are commonly assigned
via arrays for ordinal values like padding or fontSize, and named object
literals for named values like color. For instance padding utilizes the "space"
scale defined by the theme object.

Padding uses the space scale.

```js
space: [0, 4, 8, 16, 20, 32, 64],
```

Within the config object for the semantic key, the padding is given an index of
the space array. The code below equates to '8px'. The array could also contain
strings with any valid padding value and unit.

```js
padding: 2,
```

##### Nested Scales

Theme values can be defined in arrays or object literals. This is an example of colors defined as object literals.

```js
export const theme = withThemeweaver(
  //System UI compliant theme
  {
    colors: {
      primary: '#7789C8',
      secondary: '#C6D8FF',
      action: '#E5707A',
    },
    ...
```

These colors could also be defined as an array.

```js
export const theme = withThemeweaver(
  //System UI compliant theme
  {
    colors: {
      [
        '#7789C8',
        '#C6D8FF',
        '#E5707A'
      ]
    },
    ...
```

However, the two approaches can be combined for a more power effect. The following
example represents shades by nesting an array in the object literal.

```js
export const theme = withThemeweaver(

  {
    colors: {
      primary: ['#D4D9ED','#7789C8', '#4F66BA'], //multiple shades
      secondary: ['#C6D8FF','#00277A'],
      action: ['#F6E8E8', '#E5707A'],
    },
    ...
```

These values are accessed by suffixing the key with an index.

```js
{
  // beginning of Themeweaver config with semantic key styles *****************
  nav: {
    color: 'action[0]',  //#D4D9ED
    ...
  }
}
```

##### Responsive themes

To define values for different breakpoints, the breakpoints theme key must be
defined in the theme object:

```js
space: [0, 4, 8, 16, 20, 32, 64],
breakpoints: ['40em', '52em', '64em', '80em'],
```

The style value must be set with an array in the semantic key style. The following
value will produce a padding of '8px' for screen widths between 0 and 40em, the
first defined breakpoint. It will produce a value of 32px for any screens 40em and wider.

```js
padding: [2, 5],
```

## variant

Utilize the variant function to create a variant object and spread it into the config.
The function recieves a name parameter and a config object with styles for the variant to use.

```js
import { withThemeweaver, variant } from 'themeweaver';

export const theme = withThemeweaver(
  {
    ...
  },
  {
    // beginning of Themeweaver config with semantic key styles *****************
    nav: {
      ...variant('main', {
        color: ['primary', 'mainText'],
        backgroundColor: 'secondary',
        fontFamily: 'h1',
        fontSize: 3,
        fontWeight: 'bold',
        padding: [2, 5],
      }),
      ...variant('secondary', {
        color: ['primary', 'mainText'],
        backgroundColor: 'secondary',
        fontFamily: 'h1',
        fontSize: 3,
        fontWeight: 'bold',
        padding: [2, 5],
      }),
    },
  }
);

export default theme;
```

## value

It is possible to assign explicit values directly to the semantic key by wrapping
it in the value function.

```js
import {withThemeweaver, variant, value } from 'themeweaver';
  export const theme = withThemeweaver(
  {
    ...
  },
  {
    // beginning of Themeweaver config with semantic key styles *****************
  nav: {
    ...variant('main', {
      color: value('Salmon'),  // color assigned explicitly
    ...
  }
```

## API: Theme Usage

All API functions can be individually imported into a component prefixed with
"get" such as "getColor". 

#### Import

```js
import { getColor, getBackgroundColor, getPadding } from 'themeweaver';
import { breakpoint } from '@carpenjk/prop-x';
import styled from 'styled-components';
```

#### Usage

```js
const StyledLink = styled.a`
  color: ${getColor('nav.main', 'yellow')};
  background-color: ${getBackgroundColor('nav.main', 'grey')};
  padding: ${getPadding('nav.main', '20px')};
  ${breakpoint(1)`
      padding: ${getPadding('nav.main', '20px')};
      `}
`;
```

### Get functions

Get functions are imported individually to limit the size of the code base for the component
These are the same functions which are accessable by the tw object. All get
functions follow the same convention except for [getTransitions](#getTransitions) and [getZIndex](#getZIndex).

```js
getStyle(semanticKey, fallbackValue);
```

Get functions are imported individually.

```js
import { getColor, getBackgroundColor, getPadding } from 'themeweaver';
```

The semantic key is a string containing the concatenated semantic group and the
variant name delimited by a period.

```js
color: ${getColor('nav.main', 'blue')};
```

Alternatively, the fallback value can be moved outside of the function for the
same result. Removing it completely is acceptable, but will produce an invalid
style if the semantic key cannot be found.

```js
color: ${getColor('nav.main') || 'blue'};
color: ${getColor('nav.main')};
```

All valid css style values can be used. Ordinal values without a unit will be
given a unit of "px". Numerical values without units such as zIndex should be
defined as strings in both the theme and fallback value.

```js
font-size: ${getFontSize('nav.main', '1rem')}
font-size: ${getFontSize('nav.main', 16)}
```

##### Complete List

```js
background-color: ${getBackgroundColor('nav.main', 'red')};

border: ${getBorder('nav.main,'thick double #32a1ce')};

border-top: ${getBorderTop('nav.main', 'thick green')};

border-right: ${getBorderRight('nav.main', 'thick green')};

border-bottom: ${getBorderBottom('nav.main', 'thick green')};

border-left: ${getBorderLeft('nav.main', 'thick green')};

border-color: ${getBorderColor('nav.main', 'blue')};

border-width: ${getBorderWidth('nav.main', '1em')};

border-style: ${getBorderStyle('nav.main', 'dashed solid')};

border-radius: ${getBorderRadius('nav.main', '5px')};

box-shadow: ${getBoxShadow('nav.main', '10px 5px 5px red')};

color: ${getColor('nav.main', 'blue')};

font-family: ${getFontFamily('nav.main', "'Roboto', sans-serif")};

font-size: ${getFontSize('nav.main', '2.4rem')};

font-weight: ${getFontWeight('nav.main', 'bold')};

height: ${getHeight('nav.main', 'auto')};

line-height: ${getLineHeight('nav.main', '150%')};

letter-spacing: ${getLetterSpacing('nav.main', 'normal')};

margin: ${getMargin('nav.main', '10px 5px 10px 5px')};

margin-top: ${getMarginTop('nav.main', '10px')};

margin-right: ${getMarginRight('nav.main', '5px')};

margin-bottom: ${getMarginBottom('nav.main', '10px')};

margin-left: ${getMarginLeft('nav.main', '5px')};

max-height: ${getMaxHeight('nav.main', '100vh')};

max-width: ${getMaxWidth('nav.main', '50%')};

min-height: ${getMinHeight('nav.main', '300px')};

min-width: ${getMinWidth('nav.main', '500px')};

padding: ${getPadding('nav.main', '10px 5px 10px 5px')};

padding-top: ${getPaddingTop('nav.main', '10px')};

padding-right: ${getPaddingRight('nav.main', '5px')};

padding-bottom: ${getPaddingBottom('nav.main', '10px')};

padding-left: ${getPaddingLeft('nav.main', '5px')};

text-shadow: ${getTextShadow('nav.main', '1px 1px 2px pink')};

transition: ${getTransitions({
        style: 'top',
        path: 'nav.main',
        fallback: 'top 500ms ease'
      })};

width: ${getWidth('nav.main', '600px')};

z-index = {getZIndex('nav.main', '0')};
```

## getTransitions

getTransitions functions a little differently than the rest of the get functions.
Each variant can assign 1 transition per css property and a transition object
is used to pass the retrieval criteria.

##### Theme

```js
import { withThemeweaver, variant } from 'themeweaver';

export const theme = withThemeweaver(
  {
    ...
    transitions: {fade: 'color 400 ms ease', top: 'top 500ms ease'} // named transition values
  },
  {
    // beginning of Themeweaver config with semantic key styles *****************
    nav: {
      ...variant('main', {
        color: ['primary', 'mainText'],
        backgroundColor: 'secondary',
        fontFamily: 'h1',
        fontSize: 3,
        fontWeight: 'bold',
        padding: [2, 5],
        transition: {color: 'fade', top: 'top'},  //transitions assigned by css property
      })
    },
  }
);

export default theme;
```

##### Usage

```js
import { getTransitions } from 'themeweaver'

transition: ${getTransitions({
        style: 'top',  //css property
        path: 'nav.main', //semantic key path
        fallback: 'top 500ms ease' //fallback transition value
      })};

```

##### Multiple Transitions

Multiple property transitions can be retrieved with a single getTransitions call by
passing in an array of transition objects.

```js
import { getTransitions } from 'themeweaver'

transition: ${getTransitions(
      [
        {
          style: 'top',  //css property
          path: 'nav.main', //semantic key path
          fallback: 'top 500ms ease' //fallback transition value
        },
        {
          style: 'color',  //css property
          path: 'nav.main', //semantic key path
          fallback: 'color 500ms ease' //fallback transition value
        }
      ]
      )};
```

## getZIndex

It is possible to asign a z-index from the theme using the getZIndex function
to set the component's properties.

```js
import { getZIndex } from 'themeweaver'

<StyledLink zIndex = {getZIndex('nav.main', 1)} >
  click me!
<StyledLink />
```

## breakpoint

The breakpoint function allows for setting multiple breakpoints within the
component style. The breakpoint function is a function which calls a tag
function in which the styles are inserted. A breakpoint value must be passed
directly to the function as a index of the breakpoints defined in the theme.
The breakpoint value is used by all of other style functions to find the correct
style value from the theme definition.

```js
${breakpoint(breakpointValue)`
  padding: ${getPadding('nav.main', '20px')};
  ...
  `}
```

The following example styles a link with the primary color #7789C8 when the screen
width is below 40em and uses the secondary color #C6D8FF when the screen width is at least
40em.

##### Theme

```js
export const theme = withThemeweaver(
  {
    ...
    colors: {
      primary: '#7789C8',
      secondary: '#C6D8FF',
    },
    breakpoints: ['40em', '52em', '64em', '80em'],  //Breakpoint 1 = '40em'
  },
  {
    // beginning of Themeweaver config with semantic key styles *****************
    nav: variant('main', {
        color: ['primary', 'secondary'],      //breakpoint 1 value = 'secondary'
        ...
    }),
  }
);
```

##### Usage

```js
import { breakpoint, getColor } from 'themeweaver';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${getColor('nav.main', 'yellow')}; // color: #7789C8

  ${tw.breakpoint(1)`
  color: ${getColor('nav.main', '20px')};       // color: #C6D8FF
  `}
`;
```

## toggleClass

The toggleClass function is an additional utility function used to conditionally
set the className of a component. This function is helpful when
[toggling transitions](#Toggling-Transitions).

```js
toggleClass(triggerBln, className);
```

##### Import

```js
import { toggleClass } from 'themeweaver';
```

##### Usage

The styledLink component will have a className of 'tw-transition' when triggerTransition is true.

```js
<StyledLink className={${toggleClass(props.triggerTransition, 'tw-transition')} >
  click me!
</StyledLink>
```

# Toggling Transitions

Transitions often occur with a change in state. To facilitate this, use the
[toggleClass](#toggleClass) function to toggle the clas of the component and add
a corresponding class selector in your component's css.

```css
&.tw-transition {
  padding: ${getPadding('nav.hover', '20px')};
  color: ${getColor('nav.hover', 'orange')};
  transition: ${getTransitions(
    [
      {
        style: 'padding',
        path: 'nav.main',
        fallback: 'padding 1000ms ease'
      }, {
        style: 'color',
        path: 'nav.main',
        fallback: 'color 1000ms ease'
      }
    ]
    )};
}
```

This produces css similar to the folowing:

```css
&.tw-transition {
  padding: 32px;
  color: #f6e8e8;
  transition: 'padding 200ms ease, color 500ms ease';
}
```

The functionality can be used within a breakpoint as well. Styles will be retrieved
for the appropriate breakpoint.

```js
${breakpoint(1)`
  padding: ${getPadding('nav.main', '20px')};
  &.tw-transition {
    padding: ${getPadding('nav.hover', '20px')};
    color: ${getColor('nav.hover', 'orange')};
    transition: ${getTransitions(
      [
        {
          style: 'padding',
          path: 'nav.main',
          fallback: 'padding 1000ms ease'
        }, {
          style: 'color',
          path: 'nav.main',
          fallback: 'color 1000ms ease'
        }
      ]
      )};
  }
`}
```

# Examples

[tw-mobile-menu](https://github.com/carpenjk/tw-mobile-menu)
