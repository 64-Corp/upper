/*! upper - v0.1.0 - 2014-08-03 */ 
 
 (function () { 
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

    /**
     * @method upload
     */
    Upper.prototype.listen = function (element) {
        // var reader = new FileReader();
        // blob it
        element.onchange = function () {
            
        };
    };

    /* Returns new object instance if AMD is used, or assigns it to window.Upper */
    return (function () {
        if (typeof window.define === 'function' && window.define.amd) {
            window.define([], function () {
                return Upper;
            });
        } else {
            if(!window.Upper) {
                window.Upper = Upper;
            }
            return Upper;
        }
    })();

 })();
