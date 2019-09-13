"use strict";
// _classCallCheck 类的调用检查 判断当前的this是不是当前构造函数的实例
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { //Animal 
  for (var i = 0; i < props.length; i++) { 
    var descriptor = props[i];
     descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; 
     //Animal.a =function(){} 
     //Animal.prototype.say = function(){}
     Object.defineProperty(target, descriptor.key, descriptor); 
    }
  }
// Constructor =Animal  staticProps 静态属性
function _createClass(Constructor, protoProps, staticProps) { 
  if (protoProps) _defineProperties(Constructor.prototype, protoProps); 
  //if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Animal = function () {
  _createClass(Animal, null, [{
    key: "a",
    value: function a() {
      return 1;
    }
  }]);
  function Animal(type) {
    _classCallCheck(this, Animal);

    this.type = type;
  }

  _createClass(Animal, [{
    key: "say",
    value: function say() {
      console.log('说话', this);
    }
  }]);

  return Animal;
}();

Animal(); 

var animal = new Animal('哺乳类');
console.log(Animal.a()); 