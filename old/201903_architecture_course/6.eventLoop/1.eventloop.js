// 浏览器的事件环 
// 作用域 定义的时候  执行上下文 在执行的时候 执行上下文栈来管理的  ECS
// 栈 先进后出 和 队列  先进先出 区别
// 栈 堆
// function a(){
//     b();
//     function b(){
//         c();
//         function c(){

//         }
//     }
// }
// a();
// ECS = [
//     globalContext
// ]
// ECS.push(aContext);
// ECS.push(bContext);
// ECS.push(cContext);
// ECS.pop();
// ECS.pop();
// ECS.pop();

// [].push()   [].shift();

// 宏任务 (第一次代码执行的环境 script标签 setTimeout ui渲染)  微任务
// 单线程（主线程） 工作线程 webworker 辅助线程

setTimeout(()=>{
    Promise.resolve().then(()=>{
        console.log('settimeout - then1');
        setTimeout(()=>{
            console.log('last timeout')
        })
    })
    console.log(1);
})
setTimeout(() => {
    console.log(2);
});
setTimeout(() => {
    console.log(3);
});
Promise.resolve().then(()=>{
    console.log('then');
})
Promise.resolve().then(()=>{
    console.log('then');
})
Promise.resolve().then(()=>{
    console.log('then');
});
// 浏览器中 默认当前栈执行完毕后会清空微任务 ，微任务清空后 取第一个宏任务执行，执行的过程中，会在注册一些微任务，在执行下一个宏任务之前在清空 一次微任务，在去执行下一个宏任务


// 微任务 和 宏任务 还有哪些？

// vue.$nextTick(()=>{}) // 异步的方法
// nextTick中怎么实现的  mic 微任务 
// （promise.then MutationObserver）
//  mac 宏任务 setImmediate  > setTimeout  ui script MessageChannel）

// 可以准确知道代码执行的顺序
