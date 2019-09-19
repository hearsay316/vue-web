// a.js ----- 

// module.exports = 'hello';

const a = 'hello';
const b = 'world'; // export {a,b}
export default a; // 默认导出 倒入必须加名字

export { // 只能用 解构 * as 语法
    a,
    b
}

// 可以默认 + 一个个导出

//module.exports = {a,b,default:a}


// index.js

// commonjs 规范  import es6的模块

// let str = require('./a'); // 内部实现了commonjs规范
// es6 的语法 （尽量不要 require和 es6语法混用）  tree-shaking

// import xxx from './a'  // export default 

// import {a,b} from './a'
// import * as obj from './a'

// 用babel 转化 import 和  export  babel-node

let obj = require('./a'); //  如果用commonjs规范 需要多加一层default
console.log(obj.default,obj.a,obj.b);