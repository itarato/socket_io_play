var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

app.get('/client', function (req, res) {
    res.sendFile(__dirname + '/static/client.html');
})

io.on('connection', function (socket) {
    console.log('socket connected');
    socket.on('disconnect', function () {
        console.log('socket disconnected');
    });
    socket.on('client', function (data) {
        console.log('socket client:', data);
        io.emit('client', data);
    })
});

http.listen(3000, function () {
    console.log('listen on 3000');
});
