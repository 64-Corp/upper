module.exports = (function () {

    'use strict';

    /**
     * @class Upper
     */
    var Upper       = function () {
        self        = this;
    },
        detective   = new (require('./utility/detective.js'))(),
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
                    res.write(require('fs').readFileSync(__dirname + '/static/upper.js'));
                    res.end();
                } else if (req.path === '/ng-upper.js' && args && args.angular) {
                    res.set('Content-Type', 'text/javascript');
                    res.write(require('fs').readFileSync(__dirname + '/static/ng-upper.js'));
                    res.end();
                }
                next();
            };
        } else {

        }
    };

    /**
     * @method use
     * @desc set method to listen for file streams - compatible with socket.io and expressjs's `req` object
     * @returns status {Boolean}
     */
    Upper.prototype.use = function (lib) {
        self.transport = detective.query(lib);
        return self;
    };

    /**
     * @method listen
     * @desc listen for file blobs from the client or HTTP posts
     */
    Upper.prototype.listen = function () {

    };

    return Upper;
})();
