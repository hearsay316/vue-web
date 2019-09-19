// let & const var变量提升 
// 1).变量提升的概念 当全局执行的时候 会产生一个上下文
// 作用域 执行上下文 vo ao
// 所有带var 关键字都改成let/const

// 2) let不能重复声明变量
// let a = 1;
// let a = 2;

// 3) 作用域 var 会污染全局变量 let 不会污染全局变量的
// let 配合 {} 可以产生作用域
// let a = 100; // es6 暂存死区
// {
//     console.log(a);
//     let a =1;
// }
// 常量 不可修改的量
const PI = {};
PI.a = 3.15;
// 代码中只要变量不修改就全部使用const 如果变量需要修改那就使用let
