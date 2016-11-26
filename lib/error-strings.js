'use strict';

const BUILD_ARGS_NON_ARRAY = 'arguments should all be arrays';
const BUILD_ARGS_ARRAY_LENGTH = 'array arguments should all have a length of 2';
const BUILD_ARGS_ELEMENT_NOT_DEFINED = 'array arguments not defined';
const BUILD_ARGS_FIRST_ELEMENT_OBJECT = 'first argument in array should be an plain javascript object';
const BUILD_ARGS_SECOND_ELEMENT_FUNCTION = 'second argument in array should be a function';

const PATTERN_ARGS_ONLY_TYPES = 'only native Types are allow for pattern args';

module.exports = {
  // build args
  BUILD_ARGS_NON_ARRAY,
  BUILD_ARGS_ARRAY_LENGTH,
  BUILD_ARGS_ELEMENT_NOT_DEFINED,
  BUILD_ARGS_FIRST_ELEMENT_OBJECT,
  BUILD_ARGS_SECOND_ELEMENT_FUNCTION,
  // pattern args
  PATTERN_ARGS_ONLY_TYPES,
};
