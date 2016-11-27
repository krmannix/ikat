'use strict';

const _ = require('lodash');

const NO_MATCH = Symbol('NO_MATCH');

// Comparison
const GT = Symbol('GT');
const GTE = Symbol('GTE');
const LT = Symbol('LT');
const LTE = Symbol('LTE');

// Existence
const UNDEFINED = Symbol('UNDEFINED');
const NOT_UNDEFINED = Symbol('NOT_UNDEFINED');
const NULL = Symbol('NULL');
const NOT_NULL = Symbol('NOT_NULL');

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

  static get UNDEFINED() {
    return UNDEFINED;
  }

  static get NOT_UNDEFINED() {
    return NOT_UNDEFINED;
  }

  static get NULL() {
    return NULL;
  }

  static get NOT_NULL() {
    return NOT_NULL;
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
    if (!hasOperator(val)) return false;

    return val.operator === GT ||
           val.operator === GTE ||
           val.operator === LT ||
           val.operator === LTE;
  }

  static isExistence(val) {
    if (!hasOperator(val)) return false;

    return val.operator === UNDEFINED ||
           val.operator === NOT_UNDEFINED ||
           val.operator === NULL ||
           val.operator === NOT_NULL;
  }

}

function hasOperator(val) {
  return val instanceof Object && val.operator;
}

module.exports = Common;
