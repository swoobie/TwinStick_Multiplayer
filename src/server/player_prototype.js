function Player(socketId, image, x, y) {
  this.id = socketId;
  this.image = image;
  this.x = x;
  this.y = y;
  this.angle = 0;
  this.angleOffset = 90;
  this.moveSpeed = 2;
  this.turnSpeed = 1;

  this.moveForward = function() {
    this.y += this.moveSpeed * Math.sin((this.angle + this.angleOffset )* Math.PI / 180);
    this.x += this.moveSpeed * Math.cos((this.angle + this.angleOffset ) * Math.PI / 180);
  };

  this.moveBackward = function () {
    this.y += (-1) * this.moveSpeed * Math.sin((this.angle + this.angleOffset )* Math.PI / 180);
    this.x += (-1) * this.moveSpeed * Math.cos((this.angle + this.angleOffset ) * Math.PI / 180);
  };

  this.rotateLeft = function() {
    this.angle -= this.turnSpeed;
  };
  this.rotateRight = function() {
    this.angle += this.turnSpeed;
  };

}




module.exports = Player;
