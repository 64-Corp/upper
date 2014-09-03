(function () {
    'use strict';

    var Socket, self;

    /**
     * @method Socket
     * @desc Socket class sugar for easy emitting
     */
    module.exports = Socket = function (config) {
        self = this;

        return config ? (function () {
            self.path = config.path;
            self.log = config.log;
            return self;
        }) : self;
    },
        self;

    /**
     * @inherits Websocket() instance
     */
    Socket.prototype = new WebSocket('ws://' + window.location.host + (Socket.prototype.path || '/upper'), ['soap', 'xmpp']);

    /**
     * @method emit
     * @desc Send data to the server
     */
    Socket.prototype.emit = function (data) {
        self.send(JSON.stringify(data));
    };
})();
