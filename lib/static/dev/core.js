    'use strict';
    /**
     * @class Upper
     * @param {Object} config: Configuration infor, transport is necessary
     * @desc Client side Upper object with AMD compatability
     * @returns self - attacked to window when AMD is not utilized
     */
    var Upper = function (config) {

        // Socket class sugar for easy emitting
        var Socket = function () {};
        Socket.prototype = new WebSocket('ws://' + window.location.host + ((config && config.path) || '/upper'), ['soap', 'xmpp']);
        Socket.prototype.emit = function (event, data) {
            Socket.prototype.send(JSON.stringify({
                event: event,
                data: data
            }));
        };

        this.socket = new Socket();

        self = this;
    },
        EventEmitter = require('events').EventEmitter,
        self;

    // Inherit EventEmitter for easy data notification and system integration
    Upper.prototype = new EventEmitter();

    /**
     * @method listen
     * @desc listen to an file input element
     * @args {Object} element, Reference to the file input HTML node
     */
    Upper.prototype.listen = function (element) {

        element.addEventListener('change', function () {
            var reader = new window.FileReader(),
                uploadReader = new window.FileReader(),
                file = element.files && element.files[0];

            reader.onload = function (e) {
                self.emit('preview', e.target.result);
            };
            reader.readAsDataURL(file);

            uploadReader.onload = function (e) {
                self.emit('data', {
                    name: file.name,
                    data: e.target.result
                });
            };

            uploadReader.readAsBinaryString(file);
        }, false);
    };
