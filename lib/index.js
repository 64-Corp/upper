module.exports = (function () {
    'use strict';

    /**
     * @class Upper
     */
    var Upper = function () {};

    /**
     * @property client
     * @desc hosts the client side javascript on the express static server
     * @returns clientObj {Object} - ExpressJs compatible middleware
     * @example `app.use(upper.client)`
     */
    Upper.prototype.client = (function () {

    })();

    return new Upper();
})();
