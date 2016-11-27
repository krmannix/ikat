'use strict';

const common = require('../common');
const ikat = common.ikat;
const chai = require('chai');
const expect = chai.expect;

describe('base', () => {
  describe('meta', () => {

    describe('default', () => {
      it('true for only default', () => {
        let options = ikat.default();

        let data = {
          a: 111,
        };

        let func = common.funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('true for default with no match', () => {
        let options = {
          a: [String],
        };
        let defaultOptions = ikat.default();

        let data = {
          a: 111,
        };

        let func = ikat.build(
          [options, () => false],
          [defaultOptions, () => true]
        );

        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for no match', () => {
        let options = {
          a: [Number],
        };
        let defaultOptions = ikat.default();

        let data = {
          a: 1,
        };

        let func = ikat.build(
          [options, () => true],
          [defaultOptions, () => false]
        );

        let val = func(data);

        expect(val).to.be.true;
      });
    });

  });
});
