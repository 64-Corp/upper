(function () {
    'use strict';

    /**
     * @test ExpressJs integration
     */
    var upper, app, io, request, fs, http, server, WSServer;
    beforeEach(function () {
        fs =        require('fs'),
        http =      require('http'),
        app =       require('express')(),
        server =    http.createServer(app),
        upper =     require('../../../index.js')({ server: server }),
        WSServer =  require('ws').Server,
        request =   require('supertest');
    });

    describe('expressjs integration', function () {

        beforeEach(function () {

            // Use the middleware
            app.use(upper.client({ express: true, angular: true }))

            // Create the server and listen

            server.listen(process.env.PORT || 5000);
        });

        afterEach(function () {
            // After each test, close the server
            server.close();
        });

        it('should host upper.js and ng-upper.js', function () {

            // upper.js
            request(app).get('/upper.js')
            .expect(200)
            .expect('Content-Type', 'text/javascript; charset=utf-8')
            .expect(fs.readFileSync(process.cwd() + '/lib/static/dist/upper.js', 'utf-8'))
            .end(function (err, res) {
                if (err) throw err;
            });

            // ng-upper.js
            request(app).get('/ng-upper.js')
            .expect(200)
            .expect('Content-Type', 'text/javascript; charset=utf-8')
            .expect(fs.readFileSync(process.cwd() + '/lib/static/dist/ng-upper.js', 'utf-8'))
            .end(function (err, res) {
                if (err) throw err;
            });
        });

        it('should detect that http and socket.io are preffered transport methods', function () {

        });
    });

})();
