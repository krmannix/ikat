'use strict';

const common = require('../common');
const ikat = common.ikat;
const chai = require('chai');
const expect = chai.expect;

describe('base', () => {
  describe('primitive', () => {

    describe('Boolean', () => {
      let options = {
        a: [Boolean],
      };

      it('true for match', () => {
        let data = {
          a: true,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for no match', () => {
        let data = {
          a: 'true',
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });
    });

  });
});
