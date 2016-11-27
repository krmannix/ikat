'use strict';

const Common = require('./common');

class PatternType {

  /*
   * Comparison
   */

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

  /*
   * Existence
   */

  static undefined() {
    return {
      operator: Common.UNDEFINED,
    };
  }

  static notUndefined() {
    return {
      operator: Common.NOT_UNDEFINED,
    };
  }

  static null() {
    return {
      operator: Common.NULL,
    };
  }

  static notNull() {
    return {
      operator: Common.NOT_NULL,
    };
  }

}

module.exports = PatternType;
