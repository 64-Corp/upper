(function () {
    'use strict';

    var lib;
    beforeEach(function () {
        lib = require('../../../index.js')({ some: 'args' });
    });

    describe('Upper object', function () {
        it('should load an instance of the Upper object', function () {
            lib.should.be.an('object');
            lib.should.be.an.instanceOf(require('../../../lib/upper.js'));
        });
    });

})();
