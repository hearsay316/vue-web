
// 默认node的执行顺序和浏览器的事件环的顺序是一致的
// 浏览器 是两个队列 微任务 宏任务
// node 分成n个队列

// 1)
// setImmediate(()=>{
//     console.log('immediate')
// });
// setTimeout(()=>{
//     console.log('timeout');
// })

// 假如node启动时耗时比较长  5ms  
// 有可能耗时 小于4
// 看timeout是否达到执行时间

// setTimeout(()=>{
//     console.log('timeout')
// })
// process.nextTick(()=>{
//     console.log('nextTick'); //  微任务
// });
// console.log('hello');

// 2) 
// const fs = require('fs');

// fs.readFile('./age.txt', () => {
//   setTimeout(() => {
//     console.log('timeout');
//   }, 0);
//   setImmediate(() => {
//     console.log('immediate');
//   });
// });

// i/o 队列中的下一个用永远是check阶段
// 低版本的node下 有可能顺序是这样的 prmise1  timeout2  timeout1 promise2
// Promise.resolve().then(()=>{
//     console.log('prmise 1')
//     setTimeout(()=>{
//         console.log('timeout1')
//     })
// })
// setTimeout(()=>{
//     Promise.resolve().then(()=>{
//         console.log('promise2 ');
//     })
//     console.log('timeout2');
// });

Promise.resolve().then(()=>{
    console.log('then1');
});
// node中的nextTick 会比 promise.resolve.then(()=>{}) 快
process.nextTick(()=>{
    console.log('nextTick')
});
