/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	MovingObject = __webpack_require__(1);
	Util = __webpack_require__(2);
	Asteroid = __webpack_require__(3);
	Game = __webpack_require__(4);
	GameView = __webpack_require__(5);
	Ship = __webpack_require__(6);

	const anthony = new MovingObject({
	  pos: [200, 200],
	  vel: [0, 0],
	  color: "#FF0000",
	  radius: 100
	});

	const canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.height = 200;
	canvasEl.width = 200;
	const ctx = canvasEl.getContext("2d");

	const buddyBoy = new Game(200, 200, 10);

	const view = new GameView(buddyBoy, ctx);
	view.start();
	// window.buddyBoy.draw(ctx);
	// window.buddyBoy.moveObjects();


	// let ast = new Asteroid({pos: [200,200]});
	// console.log(ast);
	// ast.draw(ctx);
	// ast.move();
	// ast.draw(ctx);

	// anthony.draw(ctx);

	// function Animal (name) {
	//   this.name = name;
	// }
	//
	// Animal.prototype.meow = "RAWWWWRRRR I'M A DINOSAUR";
	//
	// function Dog (name) {
	//   this.name = name;
	// }
	//
	// Dog.prototype.bark = "WAN WAN WAN";
	//
	// Util.inherits(Dog,Animal);
	//
	// anthony = new Animal("Anthony");
	// buddy = new Dog("buddy");
	//
	// console.log(buddy.meow);
	// console.log(anthony.bark);


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	const Util = {
	  inherits(childClass,parentClass) {
	    function Surrogate () {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },

	  randomVec (length) {
	    angle = 2 * Math.PI * Math.random();
	    return [Math.cos(angle) * length, Math.sin(angle) * length];
	  }
	};

	module.exports = Util;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	MovingObject = __webpack_require__(1);
	Util = __webpack_require__(2);

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	Asteroid = __webpack_require__(3);
	Ship = __webpack_require__(6);

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
	    // this.ship.relocate(this.randomPosition());
	    this.ship.pos = this.randomPosition();
	  } else {
	    index = this.asteroids.indexOf(asteroid);
	    this.asteroids.splice(index,1);
	  }
	};

	module.exports = Game;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function GameView(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}

	GameView.prototype.start = function() {

	  setInterval( () => {
	    this.game.step();
	    this.game.draw(this.ctx);
	  }, 20);
	};

	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	MovingObject = __webpack_require__(1);
	Util = __webpack_require__(2);


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


/***/ }
/******/ ]);