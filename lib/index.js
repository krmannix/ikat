'use strict';

const isArray = Array.isArray;
const errorStrings = require('./error-strings');

const Common = require('./common');
const PatternBuilder = require('./pattern-builder');
const PatternValidator = require('./pattern-validator');

class Ikat {

  static get noMatch() {
    return Common.noMatch;
  }

  static get NO_MATCH() {
    return Common.noMatch;
  }

  static build(...args) {
    validateBuildArgs(args);
    let patternMap = PatternBuilder.build(args);

    return object => PatternValidator.applyPatterns(object, patternMap);
  }

}

function validateBuildArgs(args) {
  args.forEach(arg => {
    if (!isArray(arg)) throw new Error(errorStrings.BUILD_ARGS_NON_ARRAY);
    if (arg.length !== 2) throw new Error(errorStrings.BUILD_ARGS_ARRAY_LENGTH);
    if (!Common.isDefined(arg[0])) throw new Error(errorStrings.BUILD_ARGS_ELEMENT_NOT_DEFINED);
    if (!Common.isDefined(arg[1])) throw new Error(errorStrings.BUILD_ARGS_ELEMENT_NOT_DEFINED);
    if (!Common.isObject(arg[0])) throw new Error(errorStrings.BUILD_ARGS_FIRST_ELEMENT_OBJECT);
    if (!Common.isFunction(arg[1])) throw new Error(errorStrings.BUILD_ARGS_SECOND_ELEMENT_FUNCTION);

    // validate the pattern argument structure
    validatePatternArg(arg[0]);
  });
}

// note: for now, only support 1 object level
function validatePatternArg(obj) {
  for (let key in obj) {
    let pattern = obj[key];
    for (let validator of pattern) {
      if (Common.isPrimitive(validator)) continue;
      if (Common.isType(validator)) continue;
      throw new Error(`validation type ${key}: ${validator} not supported`);
    }
  }
}

module.exports = Ikat;
