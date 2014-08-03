/**
 * @test wsUpload
 * @desc Upload a file to the server using websockets
 */
(function () {
    'use strict';

    describe('opening test page', function () {

        // Get an instance and visit index.html
        var prot = protractor.getInstance();
        prot.get('http://127.0.0.1:9000');

        browser.manage().logs().get('browser').then(function(browserLog) {
            console.log('log: ' + require('util').inspect(browserLog));
        });

        it('should select a file', function () {
            // upload a file
            $('input[type="file"]').sendKeys(process.cwd() + 'test/resources/data/image.jpg');
            $('#upload').click();
        });

    });

})();
