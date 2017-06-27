var PlayerList = require('./server/player_list.js');

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
  const sock_id = socket.id;
  console.log('Socket Connected: ' + sock_id);

  socket.on('newplayer', function(data){
    console.log('A new Player has joined.');

// add a player property to the current socket
// should use a prototype here to create the player
    socket.player = {
      //id: serv.lastPlayerID++,
      id: sock_id,
      image: 'ship',
      x: Math.floor(Math.random() * 300 + 100),
      y: Math.floor(Math.random() * 300 + 100)
    }

    PlayerList.addActivePlayer(socket.player);
    console.log(PlayerList.getActivePlayer(sock_id));

    socket.emit('allplayers', {players: getAllPlayers(), newPlayerId: socket.player.id});
    // notify all other clients of new player
    socket.broadcast.emit('newplayer', socket.player);
  })

// Update player movement for a specific player id
  socket.on('playerMove', function(data) {
      if(data.direction === 'left')
      {
        PlayerList.getActivePlayer(data.id).x -= 1;
      }
      if(data.direction === 'right')
      {
        PlayerList.getActivePlayer(data.id).x += 1;
      }
      if(data.direction === 'up')
      {
        PlayerList.getActivePlayer(data.id).y -= 1;
      }
      if(data.direction === 'down')
      {
        PlayerList.getActivePlayer(data.id).y += 1;
      }
      socket.broadcast.emit('playerMoveUpdate', PlayerList.getActivePlayer(data.id));
  });

  socket.on('disconnect', () => {
    console.log('Socket ' + sock_id + ' has disconnected.');

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
