'use strict';

const Common = require('./common');
const PatternType = require('./pattern');
const operatorType = require('./operator-type');

class PatternBuilder {

  static build(patterns) {
    const map = new Map();

    patterns.forEach(pattern => {
      let validators = pattern[0];
      let successFn = pattern[1];

      map.set(
        buildValidationParentFuntion(validators),
        successFn
      );
    });

    return map;
  }

}

/*
 * Builders
 */

function buildValidationParentFuntion(matchObj) {
  let funcs = [];

  for (let key in matchObj) {
    let validators = matchObj[key];
    let keyFuncs = validators.map(validator => {
      return buildValidationChildFuntion(key, validator);
    });
    funcs = funcs.concat(keyFuncs);
  }

  return buildValidationFuntion(funcs);
}

function buildValidationChildFuntion(key, validator) {
  if (isTypeConstructor(validator)) validator = buildTypeConstructor(validator);
  if (isValidator(validator)) return buildIsMatchFn(key, validator);

  throw new Error(`validation type ${key}: ${validator} not supported`);
}

function buildValidationFuntion(funcs) {
  return object => {
    for (let index in funcs) {
      if (!funcs[index](object)) return false;
    }
    return true;
  };
}

/*
 * isValidator
 */

function isTypeConstructor(validator) {
  return Common.isTypeConstructor(validator);
}

function buildTypeConstructor(type) {
  switch (type) {
  case Number:
    return PatternType.number();
  case String:
    return PatternType.string();
  case Boolean:
    return PatternType.boolean();
  case Object:
    return PatternType.object();
  case Map:
    return PatternType.map();
  case Set:
    return PatternType.set();
  case Date:
    return PatternType.date();
  case Array:
    return PatternType.array();
  case Function:
    return PatternType.fn();
  }
}

// TODO: Later. should put all operators in a Set and
// check for operator existence and that the set has existence
function isValidator() {
  return true;
}

function buildIsMatchFn(key, primitive) {
  return object => {
    return isMatch(object[key], primitive);
  };
}

function isMatch(val, comparison) {
  let compareValue = comparison.value;

  switch (comparison.operator) {
  case operatorType.NUMBER:
    return val === Number(val);
  case operatorType.STRING:
    return val === String(val);
  case operatorType.BOOLEAN:
    return val === Boolean(val);
  case operatorType.OBJECT:
    return Common.isObject(val);
  case operatorType.MAP:
    return val instanceof Map;
  case operatorType.SET:
    return val instanceof Set;
  case operatorType.ARRAY:
    return val instanceof Array;
  case operatorType.DATE:
    return val instanceof Date;
  case operatorType.FUNCTION:
    return val instanceof Function;
  case operatorType.GT:
    return val > compareValue;
  case operatorType.GTE:
    return val >= compareValue;
  case operatorType.LT:
    return val < compareValue;
  case operatorType.LTE:
    return val <= compareValue;
  case operatorType.UNDEFINED:
    return val === undefined;
  case operatorType.NOT_UNDEFINED:
    return val !== undefined;
  case operatorType.NULL:
    return val === null;
  case operatorType.NOT_NULL:
    return val !== null;
  default:
    return false;
  }
}

module.exports = PatternBuilder;
