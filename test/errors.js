var chai = require('chai');
var assert = chai.assert;

var errors = require('../packages/sweb3js-core-helpers/src/errors.js');

describe('lib/web3/method', function () {
    describe('getCall', function () {

        for(var key in errors) {
            it('should return and error', function () {

                assert.instanceOf(errors[key](), Error);
            });
        }

    });
});

