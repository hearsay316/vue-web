// class 封装 继承 多态
// function 构造函数充当类 类 实例
// 把属性 方法 封装到一起 （修饰符 private public protected）
// 继承  共享属性 我们可以通过继承的方式
// 多态 抽象类 子类实现的方式可能不同

// es3 构造函数 充当类

// function Animal(){ // 构造函数中的属性 都是实例上的属性
//     // 以_ 命名的都是私有属性 
//     this._type = '哺乳类';
//     this.age = 20;
//     return {}; // 返回了一个引用类型
// }
// Animal.prototype.say = function(){
//     console.log(say);
// }   
// Animal.flag = '动物';
// let animal1 = new Animal();
// let animal2 = new Animal();
// // 静态属性
// console.log(animal1,animal2);
// 继承 类的继承 


function Animal(){ 
    this._type = '哺乳类';
    this.age = 20;
}
Animal.prototype.say = function(){
    console.log('say');
}   
// let animal = new Animal();
// 每个对象都有一个 __proto__ 指向所属类的原型
// 每个原型会有一个constructor 指向所属类
// console.log(animal.constructor === Animal);
// console.log(Animal.prototype.__proto__ == Object.prototype)
// console.log(Object.prototype.__proto__);
// console.log(Animal.__proto__ === Function.prototype);
// console.log(Function.prototype.__proto__ == Object.prototype);
function Dog(name){
    Animal.call(this,name); // 获取父类的实例上的属性
}
// // 继承实例上的属性
// Dog.prototype.__proto__ = Animal.prototype;
// Object.setPrototypeOf(Dog.prototype, Animal.prototype)
function create(parentProptype){
    function Fn(){}
    Fn.prototype = parentProptype;
    let fn = new Fn()
    fn.constructor = Dog;
    return fn;
}
// Dog的原型指向了Fn的实例 这个实例 他的链指向了Animal的原型
Dog.prototype = Object.create(Animal.prototype,{constructor:{value:Dog}});
let dog = new Dog();
console.log(dog.constructor);
// 一般请款下会采用 Object.create + call 来实现继承

// Dog.prototype = new Animal(); 这种方式是无法给父类传递参数，因为传递的参数没有意义，应该实例化子类的时候才传参
