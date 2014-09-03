    'use strict';
    /**
     * @class Upper
     * @param {Object} config: Configuration infor, transport is necessary
     * @desc Client side Upper object with AMD compatability
     * @returns self - attacked to window when AMD is not utilized
     */
    var Upper = function (config) {

        self = this;

        return config ? (function () {
            self.path = config.path;
            self.log = config.log;
            return self;
        }) : self;
    },
        self;
    /**
     * @method listen
     * @desc listen to an file input element
     * @args {Object} element, Reference to the file input HTML node
     */
    Upper.prototype.listen = function (element) {
        self.element = element;

        return element ? new (require('./uploader.js'))(self) : (function () {
            throw new Error('Upper: .listen() method requires an element as argument');
        })();
    };
