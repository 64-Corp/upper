    'use strict';
    /**
     * @class Upper
     * @desc Client side Upper object with AMD compatability
     * @returns self - attacked to window when AMD is not utilized
     */
    var Upper = function (_config) {
        this.config = {
            type: (_config && _config.type) || 'socket'
        };
    };
    
    Upper.prototype = new (require('events').EventEmitter)();

    /**
     * @method upload
     */
    Upper.prototype.listen = function (element) {

        // var reader = new FileReader();
        // blob it
        element.onchange = function () {

        };
    };
