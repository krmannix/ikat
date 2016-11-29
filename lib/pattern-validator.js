'use strict';

const Common = require('./common');

class PatternValidator {

  static applyPatterns(object, patternMap) {
    for (let [validator, success] of patternMap) {
      if (validator(object)) {
        if (isFunction(success)) return success(object);
        return success;
      }
    }
    return Common.noMatch;
  }

}

function isFunction(fn) {
  return typeof fn === 'function';
}

module.exports = PatternValidator;
