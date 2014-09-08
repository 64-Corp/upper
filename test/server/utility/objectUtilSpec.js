
'use strict';

/**
 * @test Utility.ObjectUtil
 */
var oUtil, MockObj, keys;
beforeEach(function () {

    oUtil = new (require('../../../lib/utility/objectUtil.js'))();

    MockObj = function () {
        this.test = 'this is some test text';
        this.someKey = 'this is a key';
        this.someOtherKey = 'this is some other key';
    };

    keys = ['test', 'someKey', 'someOtherKey'];
});

describe('Utility.ObjectUtil functionality', function () {

    /**
     * @method containsAllKeys
     */
    describe('ObjectUtil.containsAllKeys', function () {

        it('should check if an array of keys are included in Object.keys() or a specified object', function () {
            var mock = new MockObj();
            var doesContain = oUtil.containsAllKeys(mock, keys);
            doesContain.should.be.a('boolean');
            doesContain.should.equal(true);
        });

        it('should return false if an object instance is not provided', function () {
            var doesContain = oUtil.containsAllKeys(MockObj, keys);
            doesContain.should.equal(false);
        });
    });
});
