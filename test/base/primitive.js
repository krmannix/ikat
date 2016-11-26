'use strict';

const ikat = require('../../lib');
const chai = require('chai');
const expect = chai.expect;

describe('base', () => {
  describe('primitive', () => {

    describe('Number', () => {
      let options = {
        a: [Number],
      };

      it('true for match', () => {
        let data = {
          a: 1,
          b: 'a',
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for no match', () => {
        let data = {
          a: '1',
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });
    });

    describe('String', () => {
      let options = {
        a: [String],
      };

      it('true for match', () => {
        let data = {
          a: '1',
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for no match', () => {
        let data = {
          a: 1,
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });
    });

    describe('Boolean', () => {
      let options = {
        a: [Boolean],
      };

      it('true for match', () => {
        let data = {
          a: true,
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for no match', () => {
        let data = {
          a: 'true',
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });
    });
  });

});

function funcReturnsTrue(options) {
  return ikat.build(
    [options, () => true]
  );
}
