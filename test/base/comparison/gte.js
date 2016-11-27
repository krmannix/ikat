'use strict';

const ikat = require('../../../lib');
const chai = require('chai');
const expect = chai.expect;

describe('base', () => {
  describe('comparison', () => {
    describe('gte', () => {
      it('true for gte', () => {
        let options = {
          a: [ikat.gte(1)],
        };

        let data = {
          a: 2,
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('true for equal', () => {
        let options = {
          a: [ikat.gte(1)],
        };

        let data = {
          a: 1,
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.true;
      });

      it('noMatch for lt', () => {
        let options = {
          a: [ikat.gte(1)],
        };

        let data = {
          a: 0,
        };

        let func = funcReturnsTrue(options);
        let val = func(data);

        expect(val).to.be.equal(ikat.noMatch);
      });

      it('noMatch for non-number', () => {
        let options = {
          a: [ikat.gte(1)],
        };

        let data = {
          a: 'a',
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
