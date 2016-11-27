'use strict';

const _ = require('lodash');
const operatorType = require('./operator-type');
const operatorSet = require('./operator-set');
const typeSet = require('./type-set');
const NO_MATCH = Symbol('NO_MATCH');

class Common {

  static get noMatch() {
    return NO_MATCH;
  }

  static get NO_MATCH() {
    return NO_MATCH;
  }

  static toArray(val) {
    return Array.isArray(val) ? val : [val];
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

  static isTypeConstructor(val) {
    return val && typeSet.has(val);
  }

  static isOperatorValidator(validator) {
    let operator = validator.operator;

    return operator && operatorSet.has(operator);
  }

  static isDefaultValidator(validator) {
    let operator = validator.operator;

    return operator && operator === operatorType.DEFAULT;
  }

}

module.exports = Common;
