(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var game = new Phaser.Game(16*32, 600, Phaser.AUTO, document.getElementById('game'));
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
    if(Game.playerMap[Player.id])
    {
      Game.playerMap[Player.id].x = Player.x;
      Game.playerMap[Player.id].y = Player.y;
    }
  }
};

// needs to change to take an object that defines a ship for both the client player and the other players
Game.addNewPlayer = function(id,x,y){
    Player.id = id;
    Player.x = x;
    Player.y = y;
    console.log('Adding local player: ' +Player.id + ' ' + Player.x + ' ' + Player.y);
    Game.playerMap[Player.id] = game.add.sprite(Player.x, Player.y, Player.image);
};

// Adds a player already in the game
Game.addExternalPlayer = function(id,x,y){
    console.log('Adding external player: ' + id + ' ' + x + ' ' + y);
    Game.playerMap[id] = game.add.sprite(x, y, 'ship');
};

game.state.add('Game',Game);
game.state.start('Game');

},{}]},{},[1]);
