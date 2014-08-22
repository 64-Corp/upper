module.exports = (function () {

    'use strict';

    /**
     * @class Upper
     * @constructor
     * @param {Object} config
     *        {String} server   A node http server
     *        {String} path     Websocket bind path from host
     */
    var Upper = function (config) {

        // Bind a node HTTP server to the lib to use the `ws`
        // library with existing frameworks like Expressjs
        this.server = (typeof config.server === 'object' ? function () {

            return (new (require('ws').Server)({
                server: config.server,
                path: config.path || '/upper'
            }))

            .on('connection', function (ws) {
                console.log('Client conencted');

                self._buffer = '';

                // messages from client
                ws.onmessage = function (resp) {

                    resp = resp.data;
                    try {
                        resp = JSON.parse(resp);
                        console.log('chunk: ' + resp.currentChunk + ' / ' +  resp.totalChunks);

                        /**
                         * @desc information inside resp
                         *  {
                         *      name: _file.name,
                         *      size: _file.size,
                         *      currentChunk: qself._chunkNum,
                         *      totalChunks: qself._totalChunks
                         *      data: e.target.result
                         *  }
                         */

                        if(resp.currentChunk === 0) {
                            self._buffer = '';
                        }

                        self._buffer += resp.data.toString();

                        if(resp.currentChunk === resp.totalChunks) {
                            console.log('Done!');

                            var buffer = new Buffer(self._buffer, 'binary');
                            console.log(buffer);

                            self.emit('uploaded', {
                                data: buffer,
                                name: resp.name,
                                size: resp.size,
                                utime: new Date()
                            });
                            self._buffer = '';

                        } else {
                            ws.send(JSON.stringify({ chunk: resp.currentChunk + 1 }));
                        }

                    } catch (err) {
                        ws.send(JSON.stringify({ error: 'Socket message not parseable' }));
                    }
                };
            });

        } : function () {
            throw new Error('Upper: A http server object must be passed when constructing');
        })();

        self = this;
    },
        fs = require('fs'),
        self;

    // Extend EventEmitter to notify the user
    Upper.prototype = new (require('events')).EventEmitter();

    /**
     * @property client
     * @desc hosts the client side javascript on the express static server
     * @returns clientObj {Object} - ExpressJs compatible middleware
     * @example `app.use(upper.client())`
     */
    Upper.prototype.client = function (args) {

        if(args && args.express) {
            return function middleware (req, res, next) {
                if(req.path === '/upper.js') {
                    res.set('Content-Type', 'text/javascript');
                    res.write(fs.readFileSync(__dirname + '/static/dist/upper.js'));
                    res.end();
                } else if (req.path === '/upper.min.js') {
                    res.set('Content-Type', 'text/javascript');
                    res.write(fs.readFileSync(__dirname + '/static/dist/upper.min.js'));
                    res.end();
                } else if (req.path === '/ng-upper.js' && args && args.angular) {
                    res.set('Content-Type', 'text/javascript');
                    res.write(fs.readFileSync(__dirname + '/static/dist/ng-upper.js'));
                    res.end();
                } else if (req.path === '/ng-upper.min.js' && args && args.angular) {
                    res.set('Content-Type', 'text/javascript');
                    res.write(fs.readFileSync(__dirname + '/static/dist/ng-upper.min.js'));
                    res.end();
                } else {
                    next();
                }
            };
        } else {

        }
    };

    return Upper;
})();
