(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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
module.export = Client;

},{}],2:[function(require,module,exports){
const Input = require('./input.js');
const Client = require('./client.js');
var game = new Phaser.Game(16*32, 600, Phaser.AUTO, document.getElementById('game'));
console.log(Input);
console.log(Client);
var Game = {
  init: function() {
      game.stage.disableVisibilityChange = true;
    },
  preload: function() {
    game.load.image('ship', '/assets/ship.png');
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png');
  },
  create: function() {
    // send notification that we joined
    Client.newPlayerJoin();

    // Initialize list of players
    Game.playerMap = {};
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map
  },
  update: function() {
    Input.update();
  }
};

Game.addNewPlayer = function(id,x,y){
  console.log(id + ' ' + x + ' ' + y)
    Game.playerMap[id] = game.add.sprite(x,y,'ship');
};

game.state.add('Game',Game);
game.state.start('Game');

},{"./client.js":1,"./input.js":3}],3:[function(require,module,exports){
// Client.socket
module.export = function() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
      console.log('key left down');
    }
  }

},{}]},{},[2]);
