(function () {
    'use strict';

    /**
     * @class ObjectUtil
     * @desc Object utility functions
     */

    var ObjectUtil = function () {

    };

    ObjectUtil.prototype.containsAllKeys = function (obj, keys) {
        // The keys that the object have
        var objectKeys = (obj && obj.constructor === Object) ? Object.keys(obj) : [];

        // check if all items inside `keys` exist inside `objectKeys`
        var keyCount = 0;
        for(var i in keys) {
            keyCount += parseInt(objectKeys.indexOf(keys[i]) !== -1);
        }
        // return bool
        return !!keyCount;

    };

    return ObjectUtil;
})();
