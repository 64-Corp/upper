(function () {
    'use strict';

    var app = require('express')();
    var upper = new (require('../../lib/upper.js'))();

    console.log('Run express server!');
    app.set('port', 3000);

    app.use(upper.client({ express: true, angular: true }))
    .use(require('express').static(process.cwd() + '/test/resources/public'))
    .get('/', function (req, res) {
        res.write(require('fs').readFileSync(process.cwd() + '/test/resources/html/index.html'));
        res.end();
    })
    .get('/angular', function (req, res) {
        res.write(require('fs').readFileSync(process.cwd() + '/test/resources/html/angular.html'));
        res.end();
    })
    .get('/amd', function (req, res) {
        res.write(require('fs').readFileSync(process.cwd() + '/test/resources/html/amd.html'));
        res.end();
    })

    .listen(app.get('port'), function () {
        console.log('Listening on port ' + app.get('port'));
    });

})();
