var Client = {};
Client.socket = io.connect(); // specify connect here. default is localhost

Client.newPlayerJoin = function() {
  Client.socket.emit('newplayer');
}

// when a new player joins, add them to the client's side of the game
Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});

// initialize all of the players currently in the game
Client.socket.on('allplayers',function(data){
    console.log('received current player list: ' + data);
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
});
