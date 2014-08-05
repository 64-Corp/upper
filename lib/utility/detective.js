module.exports = (function () {
    'use strict';

    /**
     * @class Util.Detective
     * @desc Detect which communication lib is passed
     */
    var Detective = function () {

        // Check the platform depending on if window and basic window.{object} types are avaliable
        this.platform = ((typeof(window) !== 'undefined') && window.Array && window.String) ? 'client' : 'server';

        this.supported = [{
            name: 'socket.io',
            keys: {
                client: ['io', 'nsp', 'json', 'ids', 'acks', 'receiveBuffer', 'sendBuffer', 'connected', 'disconnected', 'subs', '_callbacks'],
                server: ['nsp', 'server', 'adapter', 'id', 'client', 'conn', 'rooms', 'acks', 'connected', 'disconnected', 'handshake']
            }
        },{
            name: 'ws',
            keys: {
                client: [],
                server: []
            }
        }, {
            name: 'http',
            keys: {
                client: [],
                server: []
            }
        }];

        self = this;
    },
        oUtil = new (require('./objectUtil.js'))(),
        self;

    /**
     * @method query
     * @desc Check if the object or objects passed are from
     *       and then prepares the objects to be used. Objects can
     *       be placed in an array to denote fallback preferences
     * @returns {Array} [{
     *                      name: {String} name of supported lib,
     *                      lib:  {Object} refernce to the lib object
     *                  }]
     * @example detect([io, ws, http])
     */
    Detective.prototype.query = function () {

        var _detected = [];
        for(var _i = 0; _i<arguments.length; _i++) {
            var _lib = arguments[_i];
            _detected = _detected.concat((function () {
                return (self._isInstance(_lib) && self._checkKeys(_lib)) ? self._checkKeys(_lib) : [];
            })());
        }
        return _detected;
    };

    /**
     * @method _checkKeys
     * @private
     * @desc Check the keys of the included lib against
     *       known supported keys
     * @returns {Array} [{
     *                      name: {String} name of supported lib,
     *                      lib:  {Object} refernce to the lib object
     *                  }]
     */
    Detective.prototype._checkKeys = function (lib) {

        var _supportedLibs = [];
        for(var i in self.supported) {
            var _keys = self.supported[i].keys[self.platform];
            _supportedLibs = _supportedLibs.concat((function  () {
                return oUtil.containsAllKeys(lib, _keys) ? [{ name: self.supported[i].name, lib: lib }] : [];
            })());
        }
        return _supportedLibs;
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
