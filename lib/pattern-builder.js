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

function primitiveValidator(key, primitive) {
  return object => {
    return isMatchPrimitive(object[key], primitive);
  };
}

/*
 * Validator
 */

function isValidatorPrimitive(validator) {
  return Common.isPrimitive(validator);
}

/*
 * Matches
 */

function isMatchPrimitive(val, primitive) {
  return val === primitive(val);
}

module.exports = PatternBuilder;
