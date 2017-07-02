var Client = {};
Client.socket = io.connect({transports: ['websocket']}); // specify connect here. default is localhost

// Holds all of the moves the player has made. Gets sent 60 times a second to the server.
Client.movesList = [];

Client.newPlayerJoin = function() {
  Client.socket.emit('newplayer');
}

// when a new player joins, add them to the client's side of the game
Client.socket.on('newplayer',function(data){
    Game.addExternalPlayer(data);
});

// initialize all of the players currently in the game
Client.socket.on('allplayers',function(data){
    console.log('received current player list:');
    console.log(data);
    for(var i = 0; i < data.players.length; i++){
      if(data.newPlayerId !== data.players[i].id)
        Game.addExternalPlayer(data.players[i]);
      else
        Game.addNewPlayer(data.players[i].id, data.players[i].x, data.players[i].y);
    }
    console.log('My id should be: ' + data.newPlayerId);

// after we have added all of the players, setup the appropriate callbacks for dealing with them
    Client.socket.on('playerMoveUpdate', function(data) {
      console.log('Received move for player:');
      console.log(data);
      Game.moveExternalPlayer(data);
    });

    Client.socket.on('playerDisconnected', function(id) {
      console.log('Player "' + id + '" has left the game.');
      Game.removePlayer(id);
    });

    Client.socket.on('correctedMove', function(position) {
      //Game.moveCurrentPlayer(position);
    });
});

Client.sendMoves = function() {
  // only send moves if we have them
  if(Client.movesList.length !== 0) {
    Client.socket.emit('playerMove', {id: Player.id, input: Client.movesList});
    console.log('Sending moves');
    Client.movesList = []
  }
}
