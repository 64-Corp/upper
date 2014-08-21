(function () {
    'use strict';
    
    var lib, http, server;
    beforeEach(function () {
        server = require('http').createServer(),
        lib = require('../../../index.js')({ server: server });
    });

    describe('Upper object', function () {
        it('should load an instance of the Upper object', function () {
            lib.should.be.an('object');
            lib.should.be.an.instanceOf(require('../../../lib/upper.js'));
        });
    });
})();
