    'use strict';
    /**
     * @class Upper
     * @desc Client side Upper object with AMD compatability
     * @returns self - attacked to window when AMD is not utilized
     */
    var Upper = function (_config) {
        this.config = {
            transport: (function () {

                var methods = [];
                if(_config && typeof(_config.transport) === 'object')  {
                    for(var i in _config.transport) {
                        var _lib = _config.transport[i];
                        methods.concat(detective.query(_lib));
                    }
                }
                return methods || [];
            })()
        };
        self = this;
    },
        detective = new (require('../../../lib/utility/detective.js'))(),
        self;

    Upper.prototype = new (require('events').EventEmitter)();
    
    /**
     * @method upload
     * @args {Object} element, Reference to the file input HTML node
     */
    Upper.prototype.listen = function (element) {

        element.addEventListener('change', function () {
            var reader = new window.FileReader();
            var uploadReader = new window.FileReader();
            var file = element.files[0];

            reader.onload = function (e) {
                self.emit('preview', e.target.result);
            };
            reader.readAsDataURL(file);

            uploadReader.onload = function (e) {
                var uploadFile = {
                    name: file.name,
                    data: e.target.result
                };
                self.emit('data', uploadFile);
            };

            uploadReader.readAsBinaryString(file);
        }, false);
    };
