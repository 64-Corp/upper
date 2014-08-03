module.exports = (function () {
    'use strict';

    /**
     * @class Util.Detective
     * @desc Detect which communication lib is passed
     */
    var Detective = function () {
        self = this;
    },
        self;

    /**
     * @method query
     * @desc Check if the object or objects passed are from
     *       and then prepares the objects to be used. Objects can
     *       be placed in an array to denote fallback preferences
     * @example detect([io, ws, http])
     */
    Detective.prototype.query = function () {
        for(var _i = 0; _i<arguments.length; _i++) {
            var _lib = arguments[_i];
            self._isInstance(_lib);
        }
    };

    /**
     * @method _isInstance
     * @private
     * @desc Check if the included lib is an instance of an object,
     *       and not just core javascript object
     */
    Detective.prototype._isInstance = function (lib) {
        return lib.prototype !== Object;
    };
    
    return Detective;
})();
