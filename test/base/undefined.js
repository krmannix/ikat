'use strict';

const common = require('../common');
const ikat = common.ikat;
const chai = require('chai');
const expect = chai.expect;

describe('base', () => {
  describe('existence', () => {

    describe('undefined', () => {
      it('true for undefined', () => {
        let options = {
          a: [ikat.undefined()],
        };

        let data = {
          a: undefined,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('true for non-existence', () => {
        let options = {
          a: [ikat.undefined()],
        };

        let data = {
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for defined', () => {
        let options = {
          a: [ikat.undefined()],
        };

        let data = {
          a: 1,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });

      it('noMatch for null', () => {
        let options = {
          a: [ikat.undefined()],
        };

        let data = {
          a: null,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });
    });

  });
});
