'use strict';

const _ = require('lodash');

const NO_MATCH = Symbol('NO_MATCH');
const GT = Symbol('GT');
const GTE = Symbol('GTE');
const LT = Symbol('LT');
const LTE = Symbol('LTE');

class Common {

  static get noMatch() {
    return NO_MATCH;
  }

  static get NO_MATCH() {
    return NO_MATCH;
  }

  static get GT() {
    return GT;
  }

  static get GTE() {
    return GTE;
  }

  static get LT() {
    return LT;
  }

  static get LTE() {
    return LTE;
  }

  static isDefined(val) {
    return val !== undefined && val !== null;
  }

  static isObject(val) {
    return val && typeof val === 'object' && !Array.isArray(val);
  }

  static isFunction(val) {
    return _.isFunction(val);
  }

  static isPrimitive(val) {
    return val === Number ||
           val === String ||
           val === Boolean ;
  }

  static isType(val) {
    return val === Map ||
           val === Set ||
           val === Date ||
           val === Array ||
           val === Object ||
           val === Function;
  }

  static isComparison(val) {
    return typeof val === Object ||
           val.operator ||
           val.operator === LT ||
           val.operator === LTE ||
           val.operator === LT ||
           val.operator === LTE;
  }

}

module.exports = Common;
