(function () {
    'use strict';

    var Uploader, self;

    /**
     * @class Uploader
     * @desc Interface for uploading files using event emitter
     */
    module.exports = Uploader = function (upper) {
        self = this;
        self.super = upper;
        self.element = upper.element;

        self.transfer = new (require('./transfer.js'))(self.super);

        /*!
         * Listen to input for change
         */
        self.element.addEventListener('change', function () {
            var reader = new window.FileReader(),
                file = self.element.files && self.element.files[0];

            reader.onload = function (e) {
                self.emit('preview', e.target.result);
            };

            reader.readAsDataURL(file);
        }, false);

        return self;
    };

    /**
     * @inherits EventEmitter
     */
    Uploader.prototype = new (require('events').EventEmitter)();

})();
