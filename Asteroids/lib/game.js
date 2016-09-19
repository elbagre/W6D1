Asteroid = require('./asteroid.js');
Ship = require('./ship.js');

function Game(DIM_X, DIM_Y, NUM_ASTEROIDS) {
  this.DIM_X = DIM_X;
  this.DIM_Y = DIM_Y;
  this.NUM_ASTEROIDS = NUM_ASTEROIDS;
  this.asteroids = [];
  this.ship = this.buildShip();
  this.addAsteroids();
}

Game.prototype.allObjects = function () {
  return this.asteroids.concat([this.ship]);
};

Game.prototype.addAsteroids = function () {
  while (this.asteroids.length < this.NUM_ASTEROIDS) {
    this.asteroids.push(new Asteroid({ pos: this.randomPosition()}));
  }
};

Game.prototype.buildShip = function () {
  return new Ship({ pos: this.randomPosition() });
};

Game.prototype.randomPosition = function () {
  const x = Math.random() * this.DIM_X;
  const y = Math.random() * this.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach( (object) => {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach( (object) => {
    object.move();
    object.pos = this.wrap(object.pos);
  });
};

Game.prototype.mod = function(n,m) {
  return ((n % m) + m) % m;
};

Game.prototype.wrap = function (pos) {
  x = this.mod(pos[0], this.DIM_X);
  y = this.mod(pos[1], this.DIM_Y);
  return [x,y];
};

Game.prototype.checkCollisions = function () {
  this.allObjects().forEach( (object) => {
    this.allObjects().forEach( (otherObject) => {
      if (object == otherObject) {
      } else if (object.isCollidedWith(otherObject)) {
        this.remove(otherObject);
        this.remove(object);
      }
    });
  });
};

Game.prototype.step =  function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  if (asteroid === this.ship) {
    this.ship.relocate(this.randomPosition());
    // this.ship.pos = this.randomPosition();
  } else {
    index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index,1);
  }
};

module.exports = Game;
