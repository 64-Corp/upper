module.exports = function (args) {
    'use strict';

    /**
     * Return a new instance of the Upper class
     */
    return new (require('./lib/upper.js'))(args);
};
