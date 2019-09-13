"use strict";

var _class, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var Animal = (_class = (_temp =
/*#__PURE__*/
function () {
  function Animal() {
    var _this = this;

    _classCallCheck(this, Animal);

    _initializerDefineProperty(this, "aa", _descriptor, this);

    this.a = function () {
      // 这个写法把方法 加到了实例上 而不是原型上
      console.log(_this); // 这里的this永远指向animal的实例
    };
  }

  _createClass(Animal, [{
    key: "eat",
    // es7的写法
    value: function eat() {
      console.log('吃饭');
    }
  }]);

  return Animal;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "aa", [readonly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _applyDecoratedDescriptor(_class.prototype, "eat", [changeEat], Object.getOwnPropertyDescriptor(_class.prototype, "eat"), _class.prototype)), _class);

function changeEat(prototype, property, descriptor) {
  var oldFn = descriptor.value;

  descriptor.value = function () {
    console.log('喝水'); // before

    oldFn.call(this);
  };

  console.log(prototype, property, descriptor);
} // 修饰属性 或者 方法 第一个参数是当前类的原型


function readonly(prototype, property, descriptor) {
  descriptor.writable = false; // 默认descriptor如果提供了一个initializer的方法 默认会被执行，拿到返回值作为value
}

var animail = new Animal();
animail.eat(); // 1)
// @addProperty(1,2)
// @log1()
// @log2()
// // 洋葱 
// class Animal{
// }
// function addProperty(a,b){
//     return function(constrcutor){
//         console.log('inner add property')
//         constrcutor.a = a;
//         constrcutor.b = b;
//     }
// }
// function log1(){
//     console.log('outer  log1')
//    return function (){
//         console.log('inner log1');
//    }
// }
// function log2(){
//     console.log('outer  log2')
//     return function (){
//         console.log('inner log2');
//    }
// }
// console.log(Animal.a)
// 我们不会把工具安装到全局上 
// @babel/cli  @babel/core @babel/preset-env -D
// npx 可以安装包 可以执行.bin 下的命令
// npx babel 6.decorator.js -o test4.js
