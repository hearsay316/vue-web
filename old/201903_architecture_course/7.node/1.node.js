// 服务器和浏览器的区别 this
// 代码运行的时候 全局执行上下文 VO对象 variable object global属性 
// this = vo = window
// this = vo = global
// !function(){
//     console.log(this)
// }()
// console.log(this); // {} 默认情况node在执行的时候 在文件中执行的 内部会给这个文件加一个自执行函数,会把this指向更改掉

// 变量不会被直接声明到global上
// global.a = 10;
// console.log(global.a);

// node 文件的执行方式 node + 文件名  
// console.log(Object.keys(global));

// buffer
// setInterval /settimout / setImmediate


// console.dir(global,{showHidden:true}); // v8引擎上的方法 都有 只是被隐藏掉
// console.log(process) // 全局对象中的进程

// node 执行的时候可以带参数
// process.env  执行的环境
// process.argv 执行环境参数
// process.cwd()  当前的执行目录 可变的 webpack

// console.log( process.cwd() )
// 区分环境变量
// export NODE_ENV=XXXX / set NODE_ENV=xxx  (cross-env)
let url = process.env.a === 'development'?`http://localhost:3000`:`http://www.zf.cn`;
console.log(url);

// commander yargs
let obj = process.argv.slice(2).reduce((a,b,i,arr)=>{ // --port 3000
    if(b.includes('--')){
        a[b.slice(2)] = arr[i+1];
    }
    return a;
},{});
console.log(obj);
// node事件环




