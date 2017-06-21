// Parameters
var sitePath = process.argv[2] || "./index.html";
var port = 3000;

// Libraries
var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// Request logging
app.use('/client', express.static(__dirname + '/client'));

// Start server
serv.listen(port);
console.log('server started on port ' + port);

var io = require('socket.io') (serv,{});
io.sockets.on('connection', function(socket){
  console.log('socket connection established');
});
