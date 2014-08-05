(function () {
    'use strict';

    /**
     * @test Utility.Detective
     */
    var detective, MockObj;
    beforeEach(function () {
        detective = new (require('../../../../lib/utility/detective.js'))();
        MockObj = function () {
            for(var i in detective.supported[0].server) {
                var key = detective.supported[0].server[i];
                this[key] = 'test key';
            }
        };
    });

    describe('Utility.Detective functionality', function () {

        /**
         * @method _checkKeys
         */
        describe('Detective._checkKeys', function () {

            it('should compare the keys of an object against references to supported objects', function () {

                var mock = new MockObj();
                var result = detective._checkKeys(mock);
                result.should.be.an('array');
            });
        });
    });
})();
