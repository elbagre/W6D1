MovingObject = require('./lib/moving_object.js');
Util = require('./lib/util.js');
Asteroid = require('./lib/asteroid.js');
Game = require('./lib/game.js');
GameView = require('./lib/game_view.js');
Ship = require('./lib/ship.js');

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
