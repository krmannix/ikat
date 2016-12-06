'use strict';

const Common = require('./common');
const Pattern = require('./pattern');
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

  if (Common.isDefaultValidator(matchObj)) return buildDefaultMatchFn();

  for (let key in matchObj) {
    let validators = Common.toArray(matchObj[key]);

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
    return Pattern.number();
  case String:
    return Pattern.string();
  case Boolean:
    return Pattern.boolean();
  case Object:
    return Pattern.object();
  case Map:
    return Pattern.map();
  case Set:
    return Pattern.set();
  case Date:
    return Pattern.date();
  case Array:
    return Pattern.array();
  case Function:
    return Pattern.fn();
  }
}

// TODO: Later. should put all operators in a Set and
// check for operator existence and that the set has existence
function isValidator() {
  return true;
}

// returns validator array that has a function that allways returns true
function buildDefaultMatchFn() {
  return (() => true);
}

function buildIsMatchFn(key, validator) {
  return object => {
    return isMatch(object[key], validator);
  };
}

function isMatch(val, validator) {
  let operator = validator.operator;
  let compareValue = validator.value;

  switch (operator) {
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
  case operatorType.EQUAL:
    return val === compareValue;
  case operatorType.NOT_EQUAL:
    return val !== compareValue;
  case operatorType.UNDEFINED:
    return val === undefined;
  case operatorType.NOT_UNDEFINED:
    return val !== undefined;
  case operatorType.NULL:
    return val === null;
  case operatorType.NOT_NULL:
    return val !== null;
  case operatorType.DEFAULT:
    return true;
  default:
    return false;
  }
}

module.exports = PatternBuilder;
