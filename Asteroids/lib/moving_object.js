function MovingObject (hash) {

  this.pos = hash.pos;
  this.vel = hash.vel;
  this.radius = hash.radius;
  this.color = hash.color;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] = this.pos[0] + this.vel[0];
  this.pos[1] = this.pos[1] + this.vel[1];
  return null;
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  x_dist = this.pos[0] - otherObject.pos[0];
  y_dist = this.pos[1] - otherObject.pos[1];

  dist = Math.pow((x_dist * x_dist + y_dist * y_dist), 0.5);

  if (dist < this.radius + otherObject.radius) return true;
  return false;
};

module.exports = MovingObject;
