// node 一般执行的时候 都是通过node 文件名
// node repl环境 可以读取用户的输入 循环打印 控制台

// 模块化 每个文件在执行的时候为了实现模块化 每一个文件都是一个模块
// 自执行函数 IIFE  this=> module.exports
console.log(this === module.exports); // {}
// 全局对象 可以直接在代码中使用的变量
// console.log(Object.keys(global));
// process 进程
// Buffer 二进制
// clearInterval,clearTimeout,setInterval
// clearImmediate,setImmediate (宏任务)

// console.dir(global,{showHidden:true});


// process 每个应用都会开启一个进程
console.log(process.pid); // 进程的id号 ，去删除某个进程
console.log(process.platform); // darwin
// argv 执行环境带来的参数
// cwd  代表的是 当前的工作目录
// env
// nextTick

// [--config,d:,--port,80]
let args = process.argv.slice(2) // webpack --config d: --port 80
// {config:'d:',port:80}

// 处理用户的参数
// let r = args.reduce((a,b,index,arr)=>{
//     if(b.startsWith('--')){
//         a[b.slice(2)]  = arr[index+1];
//     }
//     return a
// },{});
// console.log(r);
// node事件环 node的模块的实现

// tj commander 可以处理命令行传递的参数的 可以帮我们快速实现命令行工具的功能
let program = require('commander');
// vue-cli  vue create gitclone 
program
  .command('rm <dir>')
  .option('-r, --recursive', 'Remove recursively')
  .action(function (dir, cmd) {
    console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''))
  })
program.command('del <dir>')
  .option('-d, --directory', 'Remove recursively')
  .action(function (dir, cmd) {
    console.log('delete ' + dir + (cmd.recursive ? ' recursively' : ''))
})
// program.option('-P,--port <type>','set port number')
program.version('1.1.1'); // process.argv
let r = program.parse(process.argv); // 如果用户输入--version -V 那就默认把version版本号返回
//console.log(r); // 可以帮我们解析用户传递的参数 并且还有命令行提示
// 根据用户参数 实现具体的功能 


console.log(process.cwd()); // 指定当前文件在哪里执行的 这个是绝对路径  这个变量是可以更改的


// env 会根据用户传入的环境变量来设置代码 环境变量

// process.env.NODE_ENV  production developement (export / set)

// cross-env 帮你跨平台设置环境变量 
console.log(process.env.NODE_ENV);
let baseUrl;
if(process.env.NODE_ENV === 'development'){
    baseUrl = '/'
}else{
    baseUrl = 'http://zf.cn'
}
console.log(baseUrl);

// nextTick vm.$nextTick 微任务
// nextTick < promise

// Promise.resolve().then(()=>{
//     console.log('p');
// })
// process.nextTick(()=>{
//     console.log('n');
// });

let fs = require('fs');
fs.readFile('./template.html',()=>{
    setTimeout(()=>{
        console.log('timeout');
    },5)
    setImmediate(()=>{
        console.log('setImmidate');
    })
})
// 以前的版本 需要清空每一个队列之后执行
// 每次执行队列中的callback时 都会扫面一下当前有没有微任务有的话先执行微任务
// node事件环 , 主代码执行后 会执行timers阶段中的callback
// node代码启动的时候 cpu会有一定消耗  代码3秒就开始运行了

// node事件环 是没有类型都有有自己的队列，当主栈代码执行后 ，会依次去扫描，当当前栈的存放的回调函数都执行完成后，会切换到下一个队列 （丢列里的回调达到了执行的最大个数）

// setimmeidate settimeout 宏任务
// promise nexttick
let fs = require('fs');
fs.readFile('./template.html',()=>{ // 读取完毕后才会执行这个函数
    console.log('back');
})
setImmediate(()=>{
    console.log('setImmediate')
})
// timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
// pending callbacks: executes I/O callbacks deferred to the next loop iteration.
// idle, prepare: only used internally.
// poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
// check: setImmediate() callbacks are invoked here.
// close callbacks: some close callbacks, e.g. socket.on('close', ...).