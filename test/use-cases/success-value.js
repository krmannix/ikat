'use strict';

const common = require('../common');
const ikat = common.ikat;
const chai = require('chai');
const expect = chai.expect;

describe('use cases', () => {
  describe('success value', () => {
    let options = {
      a: [Number],
    };

    it('should return Boolean', () => {
      let data = {
        a: 1,
      };

      let func = funcReturnVal(options, true);
      let val = func(data);

      expect(val).to.be.true;
    });

    it('should return Number', () => {
      let data = {
        a: 1,
      };

      let func = funcReturnVal(options, 3);
      let val = func(data);

      expect(val).to.be.equal(3);
    });

    it('should return Object', () => {
      let data = {
        a: 1,
      };

      let objectToReturn = {
        d: 'e',
        f: 1,
        g: {
          h: (() => ({
            i: ['j', true],
          })),
        },
      };

      let func = funcReturnVal(options, objectToReturn);
      let val = func(data);

      expect(val).to.be.deep.equal(objectToReturn);
    });

    it('noMatch for no match', () => {
      let data = {
        a: '1',
      };

      let func = common.funcReturnsTrue(options);
      let val = func(data);

      expect(val).to.be.equal(ikat.noMatch);
    });

  });
});

function funcReturnVal(options, value) {
  return ikat.build(
    [options, value]
  );
}
