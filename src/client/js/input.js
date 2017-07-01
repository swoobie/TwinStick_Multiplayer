// Client.socket
var Input = {
  update: function(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
      Client.sendMessage('playerMove', {id: Player.id, direction: 'left'});
      Player.rotate.left();
      //console.log('Local Move: ' + Player.id + ' ' + Player.x + ' ' + Player.y  + ' left');
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      Client.sendMessage('playerMove', {id: Player.id, direction: 'right'});
      Player.rotate.right();
      //console.log('Local Move: ' + Player.id + ' ' + Player.x + ' ' + Player.y  + ' right');
    }
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
      Client.sendMessage('playerMove', {id: Player.id, direction: 'up'});
      Player.move.forward();
      //console.log('Local Move: ' + Player.id + ' ' + Player.x + ' ' + Player.y + ' up');
    }
	if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
      Client.sendMessage('playerMove', {id: Player.id, direction: 'down'});
      Player.move.backward();
      //console.log('Local Move: ' + Player.id + ' ' + Player.x + ' ' + Player.y + ' down');
    }
  }
}
