// function sum () {
//   args = Array.from(arguments);
//   result = 0;
//
//   args.forEach( (arg) => {
//     result += arg;
//   });
//   return result;
// }

//
// function sum (...args) {
//   var result = 0;
//   args.forEach((arg) => {
//     result += arg;
//   });
//   return result;
// }

// console.log(sum(1,2,3));

Function.prototype.myBind = function(context) {

  const firstArgs = Array.from(arguments).slice(1);
  const that = this;
  return function () {
    that.apply(context, firstArgs.concat(Array.from(arguments)));
  };
};

Function.prototype.myBind = function (context, ...args) {
  return (...things) =>  {
    this.apply(context, args.concat(things));
  };
};

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// markov.says("meow", "Ned");
//
// markov.says.myBind(breakfast, "meow")("Markov");

function curriedSum(numArg) {
  const numbers = [];
  return function _curriedSum (num) {
    numbers.push(num);
    if (numbers.length == numArg) {
      let sum = 0;
      numbers.forEach( (el) => {
        sum += el;
      });
      return sum;
    } else {
      return _curriedSum;
    }
  };
}

// console.log(curriedSum(3)(10)(7)(5));

Function.prototype.curry = function(numArgs) {
  const args = [];
  const that = this;
  return function _curriedFunc (arg) {
    args.push(arg);
    if (args.length == numArgs) {
      return that.apply(null, args);
    } else { return _curriedFunc; }
  };
};

Function.prototype.curry = function(numArgs) {
  const args = [];
  const that = this;
  return function _curriedFunc (arg) {
    args.push(arg);
    if (args.length == numArgs) {
      return that(...args);
    } else { return _curriedFunc; }
  };
};

// function addThree(a,b,c) {
//   return a + b + c;
// }
//
// summer = addThree.curry(3);
// console.log(summer(1)(2)(3));
