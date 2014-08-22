    /**
     * @class FileQueue
     * @desc Queue files for sync upload
     */
    var FileQueue = function (path) {
        this._q = [];

        this._index = 0;
        this._read = 0;
        this._chunkNum = 0;
        this._CHUNK_SIZE = 1000;

        this.socket = new (require('./socket.js'))(path);

        this.socket.onmessage = function (message) {

            message = message.data;

            try {
                message = JSON.parse(message);
                if(message.chunk) {
                    qself._process();
                } else if(message.done) {
                    qself.resetFile();
                    qself._index++;
                    qself._process();
                } else if (message.error) {
                    qself.resetQueue();
                    console.error('Upper: ' + message.error);
                }
            } catch (err) {

            }
        };

        qself = this;
    },
        qself;

    FileQueue.prototype = new (require('events').EventEmitter);

    FileQueue.prototype.add = function (file) {
        qself._q.push(file);
        qself._process();
    };

    FileQueue.prototype._process = function () {
        var _file = qself._q[qself._index],
            uploadReader = new window.FileReader();

        qself._totalChunks = Math.ceil(_file.size / qself._CHUNK_SIZE);
        uploadReader.readAsBinaryString(_file.slice(qself._read, qself._read + qself._CHUNK_SIZE));

        qself._read += qself._CHUNK_SIZE;

        uploadReader.onload = function (e) {

            qself.socket.emit({
                name: _file.name,
                size: _file.size,
                currentChunk: qself._chunkNum,
                totalChunks: qself._totalChunks,
                data: e.target.result
            });

            qself.emit('progress', {
                file: _file.name,
                size: _file.size,
                read: qself._read,
                percent: (qself._chunkNum / qself._totalChunks) * 100
            });

            qself._chunkNum++;
        };
    };

    FileQueue.prototype.resetFile = function (file) {
        qself._read = 0;
        qself._chunkNum = 0;
    };

    FileQueue.prototype.resetQueue = function () {
        qself.resetFile();
        qself._index = 0;
    };

    module.exports = FileQueue;
