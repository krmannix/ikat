'use strict';

const _ = require('lodash');

const operatorType = require('./operator-type');
const operatorValues = _.values(operatorType);

module.exports = new Set(operatorValues);
