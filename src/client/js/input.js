// Client.socket
var Input = {
  update: function(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
      Client.socket.emit('playerMove', {id: Player.id, direction: 'left'});
      Player.move(Player.x - 1, Player.y);
      console.log('Local Move: ' + Player.id + ' ' + Player.x + ' ' + Player.y  + ' left');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      Client.socket.emit('playerMove', {id: Player.id, direction: 'right'});
      Player.move(Player.x + 1, Player.y);
      console.log('Local Move: ' + Player.id + ' ' + Player.x + ' ' + Player.y  + ' right');
    }
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
      Client.socket.emit('playerMove', {id: Player.id, direction: 'up'});
      Player.move(Player.x, Player.y - 1);
      console.log('Local Move: ' + Player.id + ' ' + Player.x + ' ' + Player.y + ' up');
    }
	if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
      Client.socket.emit('playerMove', {id: Player.id, direction: 'down'});
      Player.move(Player.x, Player.y + 1);
      console.log('Local Move: ' + Player.id + ' ' + Player.x + ' ' + Player.y + ' down');
    }
  }
}
