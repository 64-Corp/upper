(function () {
    'use strict';

    var lib;

    beforeEach(function () {
        lib = require('../lib/index.js');
    });

    describe('Upper object', function () {
        it('should load the Upper object', function () {
            lib.should.be.an('object');
        });
    });

})();
