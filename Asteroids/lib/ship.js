MovingObject = require('./moving_object.js');
Util = require('./util.js');


const Ship = function (hash) {
  Ship.RADIUS = 5;
  Ship.COLOR = "#FFEFD5";
  Ship.VEL = [0, 0];

  hash.radius = Ship.RADIUS;
  hash.color = Ship.COLOR;
  hash.vel = Ship.VEL;

  MovingObject.call(this, hash);
};

Ship.prototype.relocate = function(pos) {
  this.vel = [0, 0];
  this.pos = pos;
};

Util.inherits(Ship, MovingObject);

module.exports = Ship;
