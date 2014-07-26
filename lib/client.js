(function () {
    'use strict';

    /**
     * @class Upper
     * @desc Client side Upper object with AMD compatability
     */
    var Upper = function () {};

    /* Returns new object instance if AMD is used, or assigns it to window.Upper */
    return (function () {
        if (typeof window.define === 'function' && window.define.amd) {
            window.define([], function () {
                return new Upper();
            });
        } else {
            if(!window.Upper) {
                window.Upper = Upper;
            }
            return;
        }
    })();
})();
