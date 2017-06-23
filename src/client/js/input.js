// Client.socket
var Input = {
  update: function(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
      Client.socket.emit('playerMove', {id: Player.id, direction: 'left'});
      Player.move(Player.x - 1, Player.y);
      console.log('Local Move: ' + Player.id + ' ' + Player.x + ' ' + Player.y);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      Client.socket.emit('playerMove', {id: Player.id, direction: 'right'});
      Player.move(Player.x + 1, Player.y);
      console.log('Local Move: ' + Player.id + ' ' + Player.x + ' ' + Player.y);
    }
  }
}
