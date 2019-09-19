
let fs = require('fs');
// let Promise = require('./promise');
let p = new Promise((resolve,reject)=>{
    resolve(new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1000);
        },0)
    }));
})
// p.then(data=>{
//     console.log(data);
// })
// .catch(err=>{ // then的一个简写
//   console.log(err,'error')  
// });

// Promise.reject(123).catch(err=>{
    
// })

// 实现一个promise的finally方法  try catch finally

// es9 面试必考
Promise.prototype.finally1 = function(final){
    return this.then((value)=>{ // Promise.resolve可以把这个函数包装成一个promise
        return Promise.resolve(final()).then(()=>value)
    },(err)=>{
        return Promise.resolve(final()).then(()=>{throw err})
    })
}

Promise.reject(345).finally1(()=>{ // finally 也是then的一个别名 但是肯定会执行，如果返回的是一个promise，那需要等待这个promise执行完后才调用后续逻辑
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, 5000);
    })
}).catch((data)=>{
    console.log(data,'catch');
})



// 实现一个deffererd方法 angular1 Q
// function readFile(url){
//     let defer = Promise.defer();
//     fs.readFile(url,'utf8',function(err,data){
//         if(err) defer.reject(err);
//         defer.resolve(data);
//     })
//     return defer.promise
//     // return new Promise((resolve,reject)=>{
//     //     fs.readFile(url,'utf8',function(err,data){
//     //         if(err) reject(err);
//     //         resolve(data);
//     //     })
//     // })
// }
// readFile('./name.txt').then(data=>{
//     console.log(data);
// });


// 1）梳理promise
// 2）留一套考试题
// promise有三个状态
// then方法 更改状态 resolve,reject
// 一个实例会被then多次 发布订阅
// 链式调用 返回一个新的promise  promose2和x的关系
// resolvePromise x === promise2相等
// x是不是一个promise 是promise就需要then并且递归解析
// 普通值 直接返回即可
// 有可能成功和失败都会被调用 called
// 我们then方的参数是可选参数 做判断
// resolve中可能返回的依旧是promise 改造promise方法
// deferred方法
// catch , resolve,reject finnaly