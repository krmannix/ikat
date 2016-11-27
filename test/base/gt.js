'use strict';

const common = require('../common');
const ikat = common.ikat;
const chai = require('chai');
const expect = chai.expect;

describe('base', () => {
  describe('comparison', () => {

    describe('gt', () => {
      it('true for gt', () => {
        let options = {
          a: [ikat.gt(1)],
        };

        let data = {
          a: 2,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for equal', () => {
        let options = {
          a: [ikat.gt(1)],
        };

        let data = {
          a: 1,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });

      it('noMatch for lt', () => {
        let options = {
          a: [ikat.gt(1)],
        };

        let data = {
          a: 0,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });

      it('noMatch for non-number', () => {
        let options = {
          a: [ikat.gt(1)],
        };

        let data = {
          a: 'a',
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });
    });

  });
});
