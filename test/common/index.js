'use strict';

const ikat = require('../../lib');

function funcReturnsTrue(options) {
  return ikat.build(
    [options, () => true]
  );
}

module.exports = {
  ikat,
  funcReturnsTrue,
};
