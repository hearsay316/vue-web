class Animal{
    // constructor(){
    //     this.aa = 1;
    // }
    @readonly
    aa = 1; // es7的写法

    @changeEat
    eat(){
        console.log('吃饭')
    }
    a =() =>{ // 这个写法把方法 加到了实例上 而不是原型上
        console.log(this); // 这里的this永远指向animal的实例
    }
}
function changeEat(prototype,property,descriptor){
    let oldFn = descriptor.value
    descriptor.value = function(){
        console.log('喝水'); // before
        oldFn.call(this);
    }
    console.log(prototype,property,descriptor)
}
// 修饰属性 或者 方法 第一个参数是当前类的原型
function readonly(prototype,property,descriptor){
    descriptor.writable = false; // 默认descriptor如果提供了一个initializer的方法 默认会被执行，拿到返回值作为value
}

let animail = new Animal();
animail.eat();
 



// 1)
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