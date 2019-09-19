// util 工具方法 继承 ，工具方法

let util = require('util');

function Child(){}
function Parent(){}
// Child.prototype.__proto__ = Parent.prototype;
// Object.setPrototypeOf(Child.prototype,Parent.prototype);
// Child.prototype = Object.create(Parent.prototype)

util.inherits(Child,Parent); // 继承公有属性
let fs = require('fs');
function promisify(fn){
    return function(...args){
        return new Promise((resolve,reject)=>{
            // 能实现promise化的原理就是借助了 node中的异步方法中的回调的参数第一个参数都是error
            fn(...args,function(err,data){
                if(err) reject(err);
                resolve(data);
            })
        })
    }
}
let read = promisify(fs.readFile);
read('./note.md','utf8').then((data)=>{
    console.log(data);
});


console.log(util.isPrimitive(new String('123')));
