var Player = {
  id: -1,
  image: 'ship',
  x: 0,
  y: 0,
  angle: 0,
  angleOffset: 90,
  moveSpeed: 2,
  turnSpeed: 1
};

  Player.move = {
    forward: function() {
      Player.y += Player.moveSpeed * Math.sin((Player.angle + Player.angleOffset )* Math.PI / 180);
      Player.x += Player.moveSpeed * Math.cos((Player.angle + Player.angleOffset ) * Math.PI / 180);
    },
    backward: function () {
      Player.y += (-1) * Player.moveSpeed * Math.sin((Player.angle + Player.angleOffset )* Math.PI / 180);
      Player.x += (-1) * Player.moveSpeed * Math.cos((Player.angle + Player.angleOffset ) * Math.PI / 180);
    }
  };

  Player.rotate = {
    left: function() {
      Player.angle -= Player.turnSpeed;
    },
    right: function() {
      Player.angle += Player.turnSpeed;
    }
  };
