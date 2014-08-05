(function () {
    'use strict';

    /**
     * @test ExpressJs integration
     */
    var upper, app, io, request, fs, http, server;
    beforeEach(function () {
        upper =     require('../../../index.js')({ some: 'args' }),
        app =       require('express')(),
        io =        require('socket.io'),
        request =   require('supertest'),
        fs =        require('fs'),
        http =      require('http');
    });

    describe('expressjs integration', function () {

        beforeEach(function () {

            // Use the middleware
            app.use(upper.client({ express: true, angular: true }))

            // Create the server and listen
            server = http.createServer(app);
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
            io.listen(server);



        });
    });

})();
