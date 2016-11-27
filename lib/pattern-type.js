'use strict';

const Common = require('./common');

class PatternType {

  static gt(val) {
    return {
      value: val,
      operator: Common.GT,
    };
  }

  static gte(val) {
    return {
      value: val,
      operator: Common.GTE,
    };
  }

  static lt(val) {
    return {
      value: val,
      operator: Common.LT,
    };
  }

  static lte(val) {
    return {
      value: val,
      operator: Common.LTE,
    };
  }

}

module.exports = PatternType;
