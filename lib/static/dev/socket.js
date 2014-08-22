
    // Socket class sugar for easy emitting
    var Socket = function (path) {
        this.path = path;
    };

    Socket.prototype = new WebSocket('ws://' + window.location.host + (Socket.prototype.path || '/upper'), ['soap', 'xmpp']);

    Socket.prototype.emit = function (data) {
        Socket.prototype.send(JSON.stringify(data));
    };

    module.exports = Socket;
