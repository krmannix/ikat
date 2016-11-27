'use strict';

const common = require('../common');
const ikat = common.ikat;
const chai = require('chai');
const expect = chai.expect;

describe('base', () => {
  describe('existence', () => {

    describe('notUndefined', () => {
      it('true for defined', () => {
        let options = {
          a: [ikat.notUndefined()],
        };

        let data = {
          a: 1,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for non-existence', () => {
        let options = {
          a: [ikat.notUndefined()],
        };

        let data = {
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });

      it('true for null', () => {
        let options = {
          a: [ikat.notUndefined()],
        };

        let data = {
          a: null,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for undefined', () => {
        let options = {
          a: [ikat.notUndefined()],
        };

        let data = {
          a: undefined,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });
    });

  });
});
