(function () {
    'use strict';

    var Transfer, self;

    /**
     * @class Transfer
     * @desc Transfer files in async
     */
    module.exports = Transfer = function (config) {

        self = this;

        self.q = [];
        self.index = 0;
        self.read = 0;
        self.chunkNum = 0;
        self.CHUNK_SIZE = 100000;

        self.socket = new (require('./socket.js'))(config);

        /*!
         * Listening to websocket messages
         */
        self.socket.onmessage = function (message) {
            
            message = message.data;
            try {
                message = JSON.parse(message);
                var id = self.q[0].id;

                return (message && (message.constructor === Array) && (message[0] === id)) ? function () {
                    return message[1].done ? self.reset() : self.process();
                } : function () {
                    return null;
                }();

            } catch (err) {}
        };
    };

    /**
     * @method add
     * @desc Add a file to the uploader's queue
     */
    Transfer.prototype.add = function (file) {
        self.q.push({
            id: Math.random().toString(36).substr(2, 5),
            data: file
        });
    };

    /**
     * @method process
     * @desc Send a chunk
     */
    Transfer.prototype.process = function () {

        var file = self.q[self.index],
            data = file.data,
            id = file.id,
            uploadReader = new window.FileReader();

        self.totalChunks = Math.ceil(data.size / self.CHUNK_SIZE);
        uploadReader.readAsBinaryString(file.slice(self.read, self.read + self.CHUNK_SIZE));
        self.read += self.CHUNK_SIZE;

        // data from file blob callback
        uploadReader.onload = function (e) {

            // send file chunk to server
            self.socket.emit([id, {
                name: data.name,
                size: data.size,
                currentChunk: self.chunkNum,
                totalChunks: self.totalChunks,
                data: e.target.result
            }]);

            // send upload progress
            self.emit('progress', {
                id: id,
                file: data.name,
                size: data.size,
                read: self.read,
                percent: (self.chunkNum / self.totalChunks) * 100
            });

            self.chunkNum++;
        };
    };

    /**
     * @method reset
     * @desc Reset the file chrunks
     */
    Transfer.prototype.reset = function () {
        self.read = 0;
        self.chunkNum = 0;
    };

})();
