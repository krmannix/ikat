'use strict';

const operatorType = require('./operator-type');

class Pattern {

  /*
   * Meta
   */

  static default() {
    return {
      operator: operatorType.DEFAULT,
    };
  }

  /*
   * Primitives
   */

  static number() {
    return {
      operator: operatorType.NUMBER,
    };
  }

  static string() {
    return {
      operator: operatorType.STRING,
    };
  }

  static boolean() {
    return {
      operator: operatorType.BOOLEAN,
    };
  }

  /*
   * Types
   */

  static object() {
    return {
      operator: operatorType.OBJECT,
    };
  }

  static map() {
    return {
      operator: operatorType.MAP,
    };
  }

  static set() {
    return {
      operator: operatorType.SET,
    };
  }

  static date() {
    return {
      operator: operatorType.DATE,
    };
  }

  static array() {
    return {
      operator: operatorType.ARRAY,
    };
  }

  static fn() {
    return {
      operator: operatorType.FUNCTION,
    };
  }

  /*
   * Comparison
   */

  static gt(val) {
    return {
      value: val,
      operator: operatorType.GT,
    };
  }

  static gte(val) {
    return {
      value: val,
      operator: operatorType.GTE,
    };
  }

  static lt(val) {
    return {
      value: val,
      operator: operatorType.LT,
    };
  }

  static lte(val) {
    return {
      value: val,
      operator: operatorType.LTE,
    };
  }

  static equal(val) {
    return {
      value: val,
      operator: operatorType.EQUAL,
    };
  }

  static notEqual(val) {
    return {
      value: val,
      operator: operatorType.NOT_EQUAL,
    };
  }

  /*
   * Existence
   */

  static undefined() {
    return {
      operator: operatorType.UNDEFINED,
    };
  }

  static notUndefined() {
    return {
      operator: operatorType.NOT_UNDEFINED,
    };
  }

  static null() {
    return {
      operator: operatorType.NULL,
    };
  }

  static notNull() {
    return {
      operator: operatorType.NOT_NULL,
    };
  }

}

module.exports = Pattern;
