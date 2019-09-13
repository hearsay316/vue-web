// function sum(a){
//     return function (b){
//         return a+b;
//     }
// }
// 1) 默认参数一个的时候 去掉小括号
// 2) 如果不写return 就不要写 {}
// 3 省略函数关键字
// 4) 如果返回的是对象的话 需要用小括号包裹
// let sum = a => b=> ({total:a+b})

// console.log(sum(1)(2))

let a = 100; // let 不会污染全局变量
let obj = { // let obj = {} 不是作用域
    a:1,
    fn:()=>{ // 对象可以简写函数
        // this = obj
        setTimeout(()=>{ // window.setTimeout
            console.log(this.a);
        });
    }
}
obj.fn();
// 前端荣耀