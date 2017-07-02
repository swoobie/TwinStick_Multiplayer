var game = new Phaser.Game(16*32, 600, Phaser.AUTO, document.getElementById('game'));
var moveSender = setInterval(Client.sendMoves, 16.6666);
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
      Game.playerMap[Player.id].angle = Player.angle;
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
    Game.playerMap[Player.id].anchor.setTo(0.5, 0.5);
};

// Adds a player already in the game
Game.addExternalPlayer = function(player){
    console.log('Adding external player: ' + player.id + ' ' + player.x + ' ' + player.y);
    Game.playerMap[player.id] = game.add.sprite(player.x, player.y, player.image);
    Game.playerMap[player.id].anchor.setTo(0.5, 0.5);
    Game.playerMap[player.id].angle = player.angle;
};

// Game.moveCurrentPlayer = function(position) {
//   var player = Game.playerMap[Player.id];
//   var distance = Phaser.Math.distance(player.x, player.y, position.x, position.y);
//   var duration = distance*10;
//   var tween = game.add.tween(player);
//   tween.to({x:position.x, y:position.y}, duration);
//   tween.start();
// };

// Change this so either the server sends messages less frequently or the client handles frequent messages better.
Game.moveExternalPlayer = function(playerData) {
  let player = Game.playerMap[playerData.id];
  player.x = playerData.x;
  player.y = playerData.y;
  player.angle = playerData.angle;
}

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

game.state.add('Game',Game);
game.state.start('Game');
