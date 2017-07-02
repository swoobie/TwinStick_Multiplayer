var Player = require('./player_prototype.js');
var Players = {};

Players.available = [];

Players.addActivePlayer = function(data) {
  Players.available.push(new Player(data.id, data.image, data.x, data.y));
  console.log('added a player: ' + data.id + ' ' + data.image + ' ' + data.x + ' ' + data.y);
}

Players.getActivePlayer = function(socketId) {
  return Players.available.find((p) => {
    return p.id === socketId;
  });
}

Players.removeActivePlayer = function(socketId) {
  Players.available.splice(
    Players.available.findIndex((p)=> {
     return p.id === socketId;
    }),
  1);
}

module.exports = Players;
