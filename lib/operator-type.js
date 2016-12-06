'use strict';

// Primitive
const NUMBER = Symbol('NUMBER');
const STRING = Symbol('STRING');
const BOOLEAN = Symbol('BOOLEAN');

// Type
const OBJECT = Symbol('OBJECT');
const MAP = Symbol('MAP');
const SET = Symbol('SET');
const ARRAY = Symbol('ARRAY');
const DATE = Symbol('DATE');
const FUNCTION = Symbol('FUNCTION');

// Comparison
const GT = Symbol('GT');
const GTE = Symbol('GTE');
const LT = Symbol('LT');
const LTE = Symbol('LTE');
const EQUAL = Symbol('EQUAL');
const NOT_EQUAL = Symbol('NOT_EQUAL');

// Existence
const UNDEFINED = Symbol('UNDEFINED');
const NOT_UNDEFINED = Symbol('NOT_UNDEFINED');
const NULL = Symbol('NULL');
const NOT_NULL = Symbol('NOT_NULL');

// Meta
const DEFAULT = Symbol('DEFAULT');

module.exports = {
  NUMBER,
  STRING,
  BOOLEAN,
  OBJECT,
  MAP,
  SET,
  ARRAY,
  DATE,
  FUNCTION,
  GT,
  GTE,
  LT,
  LTE,
  EQUAL,
  NOT_EQUAL,
  UNDEFINED,
  NOT_UNDEFINED,
  NULL,
  NOT_NULL,
  DEFAULT,
};
