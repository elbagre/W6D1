Function.prototype.inherits = function (superClass) {
  function Surrogate () {}
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function Animal (name) {
  this.name = name;
}

Animal.prototype.meow = "RAWWWWRRRR I'M A DINOSAUR";

function Dog (name) {
  this.name = name;
}

Dog.prototype.bark = "WAN WAN WAN";

Dog.inherits(Animal);

anthony = new Animal("Anthony");
buddy = new Dog("buddy");

console.log(buddy.meow);
console.log(anthony.bark);
