var Client = {};
Client.socket = io.connect({transports: ['websocket']}); // specify connect here. default is localhost

Client.newPlayerJoin = function() {
  Client.socket.emit('newplayer');
}

// when a new player joins, add them to the client's side of the game
Client.socket.on('newplayer',function(data){
    Game.addExternalPlayer(data.id,data.x,data.y);
});

// initialize all of the players currently in the game
Client.socket.on('allplayers',function(data){
    console.log('received current player list:');
    console.log(data);
    for(var i = 0; i < data.players.length; i++){
      if(data.newPlayerId !== data.players[i].id)
        Game.addExternalPlayer(data.players[i].id, data.players[i].x, data.players[i].y);
      else
        Game.addNewPlayer(data.players[i].id, data.players[i].x, data.players[i].y);
    }
    console.log('My id should be: ' + data.newPlayerId);

// after we have added all of the players, setup the appropriate callbacks for dealing with them
    Client.socket.on('playerMoveUpdate', function(data) {
      console.log('Received move for player: ' + data.id + ' to position: ' + data.x + ', ' + data.y);
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
