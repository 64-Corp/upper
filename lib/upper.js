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

                // messages from client
                ws.onmessage = function (resp) {
                    console.log('Message recieved: ' + resp.data);
                    resp = resp.data;

                    try {
                        resp = JSON.parse(resp);
                    } catch (err) {

                    }

                    console.log(JSON.stringify(resp, null, 4));
                };
            });

        } : function () {
            throw new Error('Upper: A http server object must be passed when constructing');
        })();
        
        self = this;
    },
        self;

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
                    res.write(require('fs').readFileSync(__dirname + '/static/dist/upper.js'));
                    res.end();
                } else if (req.path === '/upper.min.js') {
                    res.set('Content-Type', 'text/javascript');
                    res.write(require('fs').readFileSync(__dirname + '/static/dist/upper.min.js'));
                    res.end();
                } else if (req.path === '/ng-upper.js' && args && args.angular) {
                    res.set('Content-Type', 'text/javascript');
                    res.write(require('fs').readFileSync(__dirname + '/static/dist/ng-upper.js'));
                    res.end();
                } else if (req.path === '/ng-upper.min.js' && args && args.angular) {
                    res.set('Content-Type', 'text/javascript');
                    res.write(require('fs').readFileSync(__dirname + '/static/dist/ng-upper.min.js'));
                    res.end();
                }
                next();
            };
        } else {

        }
    };

    /**
     * @method listen
     * @desc listen for file blobs from the client or HTTP posts
     */
    Upper.prototype.listen = function () {

    };

    return Upper;
})();
