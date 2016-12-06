'use strict';

const common = require('../common');
const ikat = common.ikat;
const chai = require('chai');
const expect = chai.expect;

describe('base', () => {
  describe('comparison', () => {

    describe('equal', () => {
      it('true for equal', () => {
        let options = {
          a: [ikat.equal(1)],
        };

        let data = {
          a: 1,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for coerced values', () => {
        let options = {
          a: [ikat.equal(1)],
        };

        let data = {
          a: '1',
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });

      it('noMatch for falsy', () => {
        let options = {
          a: [ikat.equal(null)],
        };

        let data = {
          a: undefined,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });

      it('noMatch for array comparison', () => {
        let options = {
          a: [ikat.equal([1, 2])],
        };

        let data = {
          a: [1, 2],
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });
    });

  });
});
