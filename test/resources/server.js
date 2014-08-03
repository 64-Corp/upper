(function () {
    'use strict';

    var app = require('express')();
    var upper = new (require('../../lib/upper.js'))();

    app.set('port', 3000);
    app.use(upper.client({ express: true, angular: true }))
    .use(require('express').static(__dirname + '/../../test/resources'))
    .get('/', function (req, res) {
        res.write(require('fs').readFileSync(__dirname + '/../client/index.html'));
        res.end();
    })
    .get('/angular', function (req, res) {
        res.write(require('fs').readFileSync(__dirname + '/../client/angular.html'));
        res.end();
    })
    .get('/amd', function (req, res) {
        res.write(require('fs').readFileSync(__dirname + '/../client/amd.html'));
        res.end();
    })
    .listen(app.get('port'), function () {
        console.log('Listening on port ' + app.get('port'));
    });
})();
