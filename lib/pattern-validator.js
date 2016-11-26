'use strict';

const Common = require('./common');

class PatternValidator {

  static applyPatterns(object, patternMap) {
    for (let [validator, successFn] of patternMap) {
      if (validator(object)) {
        return successFn(object);
      }
    }
    return Common.noMatch;
  }

}

module.exports = PatternValidator;
