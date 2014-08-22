    'use strict';
    /**
     * @class Upper
     * @param {Object} config: Configuration infor, transport is necessary
     * @desc Client side Upper object with AMD compatability
     * @returns self - attacked to window when AMD is not utilized
     */
    var Upper = function (config) {

        this.queue = new (require('./queue.js'))(config && config.path);
        this.queue.on('progress', function (progress) {
            Upper.prototype.emit('progress', progress);
        });

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
                file = element.files && element.files[0];

            reader.onload = function (e) {
                self.emit('preview', e.target.result);
            };
            reader.readAsDataURL(file);
            self.queue.add(file);

        }, false);
    };
