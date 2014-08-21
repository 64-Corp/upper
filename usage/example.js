var upper =     require('upper'),
    causeway =  require('causeway'),
    io =        require('socket.io');

app.use(causeway.middleware());
app.use(upper.client({ express: true, angular: true }));

io.on('connection', function (socket) {
    
    // Use socket.io as transport
    upper.use(socket);
    causeway.use(socket);

    // configuration
    upper.config({
        notify: {
            progress: true
        }
    });

    causeway.when('*_user', function (event, args) {
        upper.listen(event, args)
        .on('complete', function () {
            // done uploading
        });
    });
});
