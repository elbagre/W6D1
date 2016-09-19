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
