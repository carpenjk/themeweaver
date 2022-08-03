import { _getVal } from "@carpenjk/prop-x/lib/internal";
import { createClassCSS } from '@carpenjk/prop-x/css';

const _DEFAULT_VARIANT = 'default';
const sysUILookup = {
  color: ['colors', 'color'],
  backgroundColor: ['colors', 'bg'],
  borderColor: ['colors', 'borderColor'],
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  margin: ['space', 'margin'],
  marginTop: ['space', 'marginTop'],
  marginRight: ['space', 'marginRight'],
  marginBottom: ['space', 'marginBottom'],
  marginLeft: ['space', 'marginLeft'],
  padding: ['space', 'padding'],
  paddingTop: ['space', 'paddingTop'],
  paddingRight: ['space', 'paddingRight'],
  paddingBottom: ['space', 'paddingBottom'],
  paddingLeft: ['space', 'paddingLeft'],
  width: ['sizes', 'width'],
  height: ['sizes', 'height'],
  minWidth: ['sizes', 'minWidth'],
  minHeight: ['sizes', 'minHeight'],
  maxWidth: ['sizes', 'maxWidth'],
  maxHeight: ['sizes', 'maxHeight'],
  border: ['borders', 'border'],
  borderTop: ['borders', 'borderTop'],
  borderRight: ['borders', 'borderRight'],
  borderBottom: ['borders', 'borderBottom'],
  borderLeft: ['borders', 'borderLeft'],
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  boxShadow: ['shadows', 'boxShadow'],
  textShadow: ['shadows', 'textShadow'],
  zIndex: 'zIndices',
  transition: 'transitions',
  transform: 'transform'
};

function _createEmptyLevel(ref, p) {
  if (!ref[p]) ref[p] = {}; // create system key or style/qualifiers
  return ref[p]; //set rolling reference point in object
}

const _drill = (ref, keys) => {
  let refCopy = Array.isArray(ref) ? [...ref] : { ...ref };
  if (!keys.forEach) return refCopy[keys]; //single level
  keys.forEach((key) => (refCopy = refCopy[key]));
  return refCopy;
};

function _bracketDrill(ref, themeKey) {
  let splitKey = themeKey.replace
    ? themeKey.replace(']', '').split('[')
    : themeKey;
  return _drill(ref, splitKey);
}

function _createAliasValues(values, theme, themeKey, ref, node) {
  if (Array.isArray(values)) {
    ref[node] = _lookupThemeAry(values, theme, themeKey);
  } else if (typeof values === 'object') {
    ref[node] = _createEmptyLevel(ref, node);
    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key])) {
        ref[node][key] = _lookupThemeAry(values[key], theme, themeKey);
      } else {
        if (key === 'value') {
          ref[node] = values[key];
        } else {
          ref[node][key] = theme[themeKey][values[key]];
        }
      }
    });
  } else {
    if (_isKeyValue(theme[themeKey][values])) {
      ref[node] = theme[themeKey][values];
    } else {
      ref[node] = _bracketDrill(theme[themeKey], values);
    }
  }
}

const _getTheme = (path, style, theme) => {
  let pSplit = path.split('.');
  const themeUI = sysUILookup[style].split
    ? [sysUILookup[style]]
    : [...sysUILookup[style]];
  const [themeKey, ...qualifiers] = themeUI;
  const group = pSplit[0];
  const variant = pSplit.length > 1 ? pSplit[1] : _DEFAULT_VARIANT;

  if (!theme[themeKey]) return ''; //theme key hasn't been defined, no need to continue

  const varNode = theme[themeKey][group]
    ? theme[themeKey][group][variant]
    : undefined;
  const leafNode =
    typeof varNode === 'object' ? _drill(varNode, qualifiers) : undefined;

  if (leafNode || leafNode === 0) {
    return leafNode;
  } else if (_isStyleNode(varNode)) {
    return varNode;
  } else {
    return '';
  }
};

const _createPath = (path, tw) => {
  if(typeof path !== 'object'){
    return path;
  }

  const qAry = [tw.semKey, tw.variant];
  const {suffix} = path;
  //filter falsy to prevent double dot scenario
  return qAry.filter(Boolean).join('.').concat(suffix || '');
}

function _isStyleNode(node) {
  return Array.isArray(node) || typeof node !== 'object';
}

function _getUnitValue(derivedValue) {
  return typeof derivedValue !== 'number' ? derivedValue : `${derivedValue}px`;
}
// const _getVal = (v, props, br) => {
//   let values = typeof v == 'function' ? v(props, br) : v;
//   if (Array.isArray(values)) return values[br];
//   return values;
// };

function _isKeyValue(value) {
  return value || value === 0;
}

function _lookupThemeAry(values, theme, themeKey) {
  return values.reduce((result, styleKey) => {
    if (typeof styleKey === 'object') {
      if (styleKey.value) {
        //array of explicit style values
        return [...result, styleKey.value];
      } else {
        //error
      }
    } else if (_isKeyValue(theme[themeKey][styleKey])) {
      //lookup value from theme
      return [...result, theme[themeKey][styleKey]];
    } else {
      const ref = theme[themeKey];
      return [...result, _bracketDrill(ref, styleKey)]; //compound lookup value from theme
    }
  }, []);
}

// function _createClassStyle(className, styles, props, br) {
//   const keys = Object.keys(styles);
//   let stylesCSS = '\n';
//   keys.forEach((style) => {
//     stylesCSS =
//       stylesCSS +
//       `    ${style}: ${_getVal(styles[style], props, br)};
// `;
//   });
//   const css = `&.${className} {${stylesCSS}}`;
//   return css;
// }

const _getBreakpointValue = (breakpoints, br, values) => {
  if (Array.isArray(values)) {
    return _getDefinedBreakpointValue(breakpoints, br, values);
  } else {
    return values;
  }
};

const _getDefinedBreakpointValue = (breakpoints, br, values) => {
  if (br) {
    return values[br];
  } else {
    return _getUndefinedBreakpoint(breakpoints, values);
  }
};

const _getUndefinedBreakpoint = (breakpoints, values) => {
  return values[0]; //! add logic at a later date
};

export const variant = (name, styles) => {
  return {
    [name]: {
      variant: true,
      styles: { ...styles },
    },
  };
};

export const value = (val) => {
  return { value: val };
};

export function toggleClass(isOn, className) {
  if (isOn) return className;
}

// export const createClassCSS = (className, styles) => (props) => {
//   return _createClassStyle(className, styles, props);
// };

//FUNCTION: withThemeweaver
// Creates and returns a theme object of a specific shape for consuming
// Clones specified theme object and appends with alias strucure which
// manages styles and variantes
// @param: theme = a theme object following system-ui spec
// @param: config = style object with following shape
/* {
  nav: variant('main', {
    color: 'action',  //action is a color specified in system-ui theme object
    backgroundColor: 'secondary',
    fontFamily: 'poppins',
    fontSize: 3,
    fontWeight: 'bold',
    padding: 4,
  })     */
// nesting variant objects is optional if only one variant present and object
//can be appended with as many groups (i.e. nav) and variants as needed
export const withThemeweaver = (theme, config) => {
  let configWithVariant = { ...config };
  let ref = theme; //moving reference for adding alias nodes starts at the top node
  let usesVariants = false;
  let groupKeys = {};

  Object.keys(config).forEach((group) => {
    groupKeys = Object.keys(config[group]);
    usesVariants = config[group][groupKeys[0]].variant;
    if (!usesVariants) {
      //! ****************************
      //if no variants are being used reshape config object with variant placeholder
      configWithVariant[group] = variant(
        _DEFAULT_VARIANT,
        configWithVariant[group]
      );
    }
    Object.keys(configWithVariant[group]).forEach((variant) => {
      Object.keys(configWithVariant[group][variant].styles).forEach((style) => {
        let themeKeys = sysUILookup[style];
        let values = configWithVariant[group][variant].styles[style];
        themeKeys = typeof themeKeys === 'object' ? themeKeys : [themeKeys];
        //1st: system key i.e colors, 2nd: category i.e. nav, 3-nth: style i.e. color, last: value
        themeKeys.forEach((key, i, keys) => {
          let isLast = i === keys.length - 1;
          if (i === 0 || !isLast) ref = _createEmptyLevel(ref, key);
          if (i === 0) {
            //create group and variant after setting system ui key
            ref = _createEmptyLevel(ref, group);
            if (!isLast) {
              ref = _createEmptyLevel(ref, variant);
            } else {
              _createAliasValues(values, theme, themeKeys[0], ref, variant);
            }
          } else if (isLast) {
            _createAliasValues(values, theme, themeKeys[0], ref, key);
          }
        });
        ref = theme; //return to top
      });
    });
  });
  return theme;
};

export const getTransitions = (transitions) => (props, br) => {
  let css = '';
  const transAry = Array.isArray(transitions) ? transitions : [transitions];
  transAry.forEach((trans, i) => {
    let transitions = _getTheme(trans.path, 'transition', props.theme);
    let transition = '';
    let derivedValue = '';

    if (typeof transitions === 'object' && !Array.isArray(transitions)) {
      //regular lookup
      transition = transitions[trans.style];
      derivedValue = _getBreakpointValue(
        props.theme.breakpoints,
        br,
        transitions[trans.style]
      );
    } else {
      //explicit value responsive
      transition = transitions;
    }
    derivedValue = !transition
      ? trans.fallback
      : _getBreakpointValue(props.theme.breakpoints, br, transition);

    css = css + derivedValue;
    if (i < transAry.length - 1) css = css + ', ';
  });
  return css;
};

export const toggleTransitions = (trans, className) => (props, br) => {
  const transAry = Array.isArray(trans) ? trans : [trans];
  let styles = {};
  let transValues = [];
  transAry.forEach((trans) => {
    styles = { ...styles, [trans.style]: _getVal(trans.value, props, br) };
    transValues = [
      ...transValues,
      { style: trans.style, path: trans.transition, fallback: trans.fallback },
    ];
  }, {});
  return createClassCSS(className || 'tw-transitions', {
    ...styles,
    transition: getTransitions(transValues)(props, br),
  })(props, br);
};

export const twTransition = (isTrans) => {
  return isTrans ? 'tw-transition' : '';
};

export const defineSpace = (config) => (props, br) => {
  const {
    inside,
    outside,
    maxInside,
    maxOutside,
    maxTotal,
    flexInside,
    flexOutside,
    border,
    boxShadow,
  } = config;
};

export const getColor = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'color', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  return _getBreakpointValue(props.theme.breakpoints, br, themeValues);
};

export const getBackgroundColor = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'backgroundColor', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  return _getBreakpointValue(props.theme.breakpoints, br, themeValues);
};

export const getBorderColor = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'borderColor', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  return _getBreakpointValue(props.theme.breakpoints, br, themeValues);
};

export const getLineHeight = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'lineHeight', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getLetterSpacing = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'letterSpacing', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getFontFamily = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'fontFamily', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  return _getBreakpointValue(props.theme.breakpoints, br, themeValues);
};

export const getFontSize = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'fontSize', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getFontWeight = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'fontWeight', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  return _getBreakpointValue(props.theme.breakpoints, br, themeValues);
};

export const getMargin = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'margin', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getMarginTop = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'marginTop', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getMarginRight = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'marginRight', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getMarginBottom = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'marginBottom', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getMarginLeft = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'marginLeft', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getPadding = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'padding', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getPaddingTop = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'paddingTop', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getPaddingRight = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'paddingRight', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getPaddingBottom = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'paddingBottom', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getPaddingLeft = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'paddingLeft', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getWidth = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'width', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getHeight = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'height', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getMinWidth = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'minWidth', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getMinHeight = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'minHeight', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getMaxWidth = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'maxWidth', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getMaxHeight = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'maxHeight', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getBorder = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'border', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getBorderTop = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'borderTop', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getBorderRight = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'borderRight', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getBorderBottom = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'borderBottom', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getBorderLeft = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'borderLeft', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getBorderWidth = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'borderWidth', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getBorderRadius = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'borderRadius', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  const derivedValue = _getBreakpointValue(
    props.theme.breakpoints,
    br,
    themeValues
  );
  return _getUnitValue(derivedValue);
};

export const getBorderStyle = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'borderStyle', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  return _getBreakpointValue(props.theme.breakpoints, br, themeValues);
};

export const getBoxShadow = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'boxShadow', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  return _getBreakpointValue(props.theme.breakpoints, br, themeValues);
};

export const getTextShadow = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'textShadow', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  return _getBreakpointValue(props.theme.breakpoints, br, themeValues);
};

export const getTransform = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'transform', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  return _getBreakpointValue(props.theme.breakpoints, br, themeValues);
};

export const getZIndex = (path, fallbackValue) => (props, br) => {
  const {tw} = props || false;
  const derivedPath = _createPath(path, tw)
  let themeValues = _getTheme(derivedPath, 'zIndex', props.theme);
  if (!_isKeyValue(themeValues)) return fallbackValue;
  return _getBreakpointValue(props.theme.breakpoints, br, themeValues);
};