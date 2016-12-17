'use strict';

const isArray = Array.isArray;
const errorStrings = require('./error-strings');

const Common = require('./common');
const Pattern = require('./pattern');
const PatternBuilder = require('./pattern-builder');
const PatternValidator = require('./pattern-validator');

class Ikat {

  static get noMatch() {
    return Common.noMatch;
  }

  static get NO_MATCH() {
    return Common.noMatch;
  }

  /*
   * Pattern validators
   */

  static default() {
    return Pattern.default();
  }

  static gt(val) {
    return Pattern.gt(val);
  }

  static gte(val) {
    return Pattern.gte(val);
  }

  static lt(val) {
    return Pattern.lt(val);
  }

  static lte(val) {
    return Pattern.lte(val);
  }

  static equal(val) {
    return Pattern.equal(val);
  }

  static notEqual(val) {
    return Pattern.notEqual(val);
  }

  static undefined() {
    return Pattern.undefined();
  }

  static notUndefined() {
    return Pattern.notUndefined();
  }

  static null() {
    return Pattern.null();
  }

  static notNull() {
    return Pattern.notNull();
  }

  /*
   * Main funtion
   */

  static build(...args) {
    validateBuildArgs(args);
    let patternMap = PatternBuilder.build(args);

    return object => PatternValidator.applyPatterns(object, patternMap);
  }

}

function validateBuildArgs(args) {
  args.forEach((arg, index) => {
    if (!isArray(arg)) throw new Error(errorStrings.BUILD_ARGS_NON_ARRAY);
    if (arg.length !== 2) throw new Error(errorStrings.BUILD_ARGS_ARRAY_LENGTH);
    if (!Common.isDefined(arg[0])) throw new Error(errorStrings.BUILD_ARGS_ELEMENT_NOT_DEFINED);
    if (!Common.isObject(arg[0])) throw new Error(errorStrings.BUILD_ARGS_FIRST_ELEMENT_OBJECT);

    // validate the pattern argument structure
    if (Common.isDefaultValidator(arg[0])) {
      validateDefaultFnArg(args, index);
    } else {
      validatePatternArg(arg[0]);
    }
  });
}

// note: for now, only support 1 object level
function validatePatternArg(obj) {
  for (let key in obj) {
    let pattern = Common.toArray(obj[key]);

    for (let validator of pattern) {
      if (Common.isTypeConstructor(validator)) continue;
      if (Common.isOperatorValidator(validator)) continue;
      throw new Error(`validation type ${key}: ${validator} not supported`);
    }

  }
}

function validateDefaultFnArg(args, index) {
  if ((index + 1) !== args.length) throw new Error('default functions should be the last pattern supplied');
}

module.exports = Ikat;
