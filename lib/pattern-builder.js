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

/*
 * isValidator
 */

function isValidatorPrimitive(validator) {
  return Common.isPrimitive(validator);
}

function isValidatorType(validator) {
  return Common.isType(validator);
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

module.exports = PatternBuilder;
