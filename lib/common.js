'use strict';

const _ = require('lodash');

const NO_MATCH = Symbol('NO_MATCH');

class Common {

  static get noMatch() {
    return NO_MATCH;
  }

  static get NO_MATCH() {
    return NO_MATCH;
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
    return val === Array ||
           val === Object ||
           val === Function;
  }

}

module.exports = Common;
