'use strict';

const Common = require('./common');

class PatternBuilder {

  static build(patterns) {
    const map = new Map();

    patterns.forEach(pattern => {
      map.set(
        buildValidationParentFuntion(pattern[0]),
        pattern[1]
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
  if (isValidatorPrimitive(validator)) return primitiveValidator(key, validator);
  if (isValidatorType(validator)) return typeValidator(key, validator);
  if (isValidatorComparison(validator)) return comparisonValidator(key, validator);
  if (isValidatorExistence(validator)) return existenceValidator(key, validator);
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
 * Validator
 */

function primitiveValidator(key, primitive) {
  return object => {
    return isMatchPrimitive(object[key], primitive);
  };
}

function typeValidator(key, primitive) {
  return object => {
    return isMatchType(object[key], primitive);
  };
}

function comparisonValidator(key, primitive) {
  return object => {
    return isMatchComparison(object[key], primitive);
  };
}

function existenceValidator(key, primitive) {
  return object => {
    return isMatchExistence(object[key], primitive);
  };
}

/*
 * isValidator
 */

function isValidatorPrimitive(validator) {
  return Common.isPrimitive(validator);
}

function isValidatorType(validator) {
  return Common.isType(validator);
}

function isValidatorComparison(validator) {
  return Common.isComparison(validator);
}

function isValidatorExistence(validator) {
  return Common.isExistence(validator);
}

/*
 * Matches
 */

function isMatchPrimitive(val, primitive) {
  return val === primitive(val);
}

function isMatchType(val, type) {
  switch (type) {
  case Object:
    return Common.isObject(val);
  default:
    return val instanceof type;
  }
}

function isMatchComparison(val, comparison) {
  let compareValue = comparison.value;

  switch (comparison.operator) {
  case Common.GT:
    return val > compareValue;
  case Common.GTE:
    return val >= compareValue;
  case Common.LT:
    return val < compareValue;
  case Common.LTE:
    return val <= compareValue;
  default:
    return false;
  }
}

function isMatchExistence(val, comparison) {
  switch (comparison.operator) {
  case Common.UNDEFINED:
    return val === undefined;
  case Common.NOT_UNDEFINED:
    return val !== undefined;
  case Common.NULL:
    return val === null;
  case Common.NOT_NULL:
    return val !== null;
  default:
    return false;
  }
}

module.exports = PatternBuilder;
