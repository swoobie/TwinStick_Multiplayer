var Player = require('./player_prototype.js');
var Players = {};

Players.available = [];

Players.addActivePlayer = function(data) {
  this.available.push(new Player(data.id, data.image, data.x, data.y));
  console.log('added a player: ' + data.id + ' ' + data.image + ' ' + data.x + ' ' + data.y);
}

Players.getActivePlayer = function(socketId) {
  return this.available.find((p) => {
    return p.id === socketId;
  });
}

Players.removeActivePlayer = function(socketId) {
  this.available.splice(
    this.available.findIndex((p)=> {
     return p.id === socketId;
    }),
  1);
}

module.exports = Players;
