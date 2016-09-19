MovingObject = require('./moving_object.js');
Util = require('./util.js');

const Asteroid = function(hash) {

  Asteroid.RADIUS = 10;
  Asteroid.COLOR = '#DA70D6';
  Asteroid.VEL = Util.randomVec(2); //is this the right length????

  hash.radius = Asteroid.RADIUS;
  hash.color = Asteroid.COLOR;
  hash.vel = Asteroid.VEL;

  MovingObject.call(this, hash);
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
