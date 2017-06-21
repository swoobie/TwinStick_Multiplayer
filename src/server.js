// Parameters
var sitePath = process.argv[2] || "./index.html";
var port = 3000;

// Libraries
var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io').listen(serv);

// setup client paths
app.use('/', express.static(__dirname + '/client'));

// send initial index.html as root for client
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// Server Variables
serv.lastPlayerID = 0;

// Start server
serv.listen(port);
console.log('server started on port ' + port);

// Handle Connections
io.sockets.on('connection', function(socket){
  console.log('socket connection established');

  socket.on('newplayer', function(data){
    console.log('A new Player has joined.');

// add a player property to the current socket
    socket.player = {
      id: serv.lastPlayerID++,
      x: Math.floor(Math.random() * 300 + 100),
      y: Math.floor(Math.random() * 300 + 100)
    }

    socket.emit('allplayers', getAllPlayers());
    // notify all other clients of new player
    socket.broadcast.emit('newplayer', socket.player);
  })
});


//
function getAllPlayers() {
  var players = [];
  Object.keys(io.sockets.connected).forEach(function(socketID) {
    // get the player property from the available sockets and put them in an array
    var player = io.sockets.connected[socketID].player;
    if(player)
      players.push(player);
  });
  return players;
}
