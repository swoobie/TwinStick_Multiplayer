var Client = {};
Client.socket = io.connect(); // specify connect here. default is localhost

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
});

Client.socket.on('playerMoveUpdate', function(data) {
  Game.playerMap[data.id].x = data.x;
  Game.playerMap[data.id].y = data.y;
  console.log('Received updated move: ' + data.id + ' ' + data.x + ' ' + data.y);
});
