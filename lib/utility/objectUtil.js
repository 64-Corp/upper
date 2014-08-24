'use strict';

var ObjectUtil;

/**
 * @class ObjectUtil
 * @desc Object utility functions
 */
module.exports = ObjectUtil = function () {};

/**
 * @method containsAllKeys
 * @desc check that an object contains all specified keys
 * @param obj {Object} Object to check for keys
 * @param keys {Array} Array of keys to check the object for
 @ @returns {Bool} if the provided object conatins all of the provided keys
 */
ObjectUtil.prototype.containsAllKeys = function (obj, keys) {
    // The keys that the object have
    var objectKeys = (obj && obj.constructor !== Object) ? Object.keys(obj) : [];

    // check if all items inside `keys` exist inside `objectKeys`
    var keyCount = 0;
    for(var i in keys) {
        keyCount += Number(!!(objectKeys.indexOf(keys[i]) !== -1));
    }

    // check keyCount against length of comparison keys
    return keyCount === keys.length;
};
