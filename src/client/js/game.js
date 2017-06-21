var game = new Phaser.Game(16*32, 600, Phaser.AUTO, document.getElementById('game'));

var Game = {
  init: function(){
      game.stage.disableVisibilityChange = true;
    },
  preload: function(){
    game.load.image('ship', '/assets/ship.png');
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png');
  },
  create: function(){
    // Initialize list of players
  //  Game.playerMap = {};
    // send notification that we joined
    Client.newPlayerJoin();



    Game.playerMap = {};
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map
    //Client.askNewPlayer();
  }
};

Game.addNewPlayer = function(id,x,y){
  console.log(id + ' ' + x + ' ' + y)
    Game.playerMap[id] = game.add.sprite(x,y,'ship');
};

game.state.add('Game',Game);
game.state.start('Game');
