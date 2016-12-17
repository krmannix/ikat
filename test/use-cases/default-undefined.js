'use strict';

const common = require('../common');
const ikat = common.ikat;
const chai = require('chai');
const expect = chai.expect;

describe('use cases', () => {
  describe('default returns undefined', () => {

    describe('Number', () => {
      let options = {
        a: Number,
      };

      it('true for match', () => {
        let data = {
          a: 'a',
        };

        let func = ikat.build(
          [options, true],
          [ikat.default(), undefined]
        );
        let val = func(data);

        expect(val).to.be.undefined;
      });
    });

  });
});
