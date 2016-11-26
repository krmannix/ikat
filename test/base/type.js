'use strict';

const ikat = require('../../lib');
const chai = require('chai');
const expect = chai.expect;

describe('base', () => {
  describe.skip('type', () => {

    describe('Array', () => {
      let options = {
        a: [Array],
      };

      it('true for match', () => {
        let data = {
          a: [],
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for no match', () => {
        let data = {
          a: {},
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });
    });

    describe('Object', () => {
      let options = {
        a: [Object],
      };

      it('true for match', () => {
        let data = {
          a: {},
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for no match', () => {
        let data = {
          a: [],
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });
    });

    describe('Function', () => {
      let options = {
        a: [Function],
      };

      it('true for match', () => {
        let data = {
          a: (() => {}),
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

  });

});

function funcReturnsTrue(options) {
  return ikat.build(
    [options, () => true]
  );
}
