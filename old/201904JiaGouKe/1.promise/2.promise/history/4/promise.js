
// 它里面可能会夹杂着别的promise的逻辑
// let i = 0
// Object.defineProperty({},'then',{
//     get(){i++;
//         if(i == 2){
//             throw new Error()
//         }
//     },
//     set(){
//     }
// })
let resolvePromise = (promise2,x,resolve,reject) => { // 统一处理结果
    // promise2就是返回的promise
    // x就是then的成功或者失败返回的值
    // promise2的 resolve、reject
    if(promise2 === x){ // 不能自己等待着自己的完成
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // 判断x是不是一个promise
    if(typeof x ==='function'  || (typeof x === 'object' && x!== null) ){
        // 第一层判断 有可能是一个promise
        try{
            let then = x.then; // promise一定有then方法  
            // then:function(){}
            if(typeof then === 'function'){ // 如果是函数我就认为是一个promise
                then.call(x,(y)=>{ // 用函数的返回的promise 采用他的状态
                    resolve(y);
                },e=>{
                    reject(e);
                })
            }else{
                resolve(x);
            }
        }catch(e){
            reject(e);
        }
    }else{
        resolve(x); // 如果是一个常量 就直接成功即可
    }
}
class Promise{
    constructor(executor){
        this.value = undefined; 
        this.reason = undefined; 
        this.status = 'pending';
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value) =>{
            if(this.status === 'pending'){
                this.status = 'fulfilled'
                this.value = value;
                // 调用resolve 会让对用的函数 依次执行
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        let reject = (reason) =>{
            if(this.status === 'pending'){
                this.status = 'rejected'
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn=>fn());
            }
        }   
        try{ 
            executor(resolve,reject);
        }catch(e){
            reject(e);
        }
    }
    then(onFufilled,onRejected){ // onFufilled或者onRejected的返回值会传递给p2的成功
        // 当then方法调用后需要返还一个新的promise
        // new Promise的时候会让promise立即执行
        let promise2 = new Promise((resolve,reject)=>{
            if(this.status === 'fulfilled'){
                // 如果执行函数的时候报错了 那么promise2直接失败即可
                setTimeout(()=>{ // 为了保证promise2 已经产生了
                    try{
                        let x = onFufilled(this.value);
                        // 就是要判断 x 是不是promise 是promise就采用他的状态
                        // 不是promise 就用它的值直接调用resolve
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        console.log(e);
                        reject(e);
                    }
                })
            }
            if(this.status === 'rejected'){
                setTimeout(() => {
                    try{
                        let x= onRejected(this.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                });
                
            }
            // ____________ 上面是处理同步逻辑的，下面是异步逻辑
            if(this.status === 'pending'){
                // 如果当前的状态是pending的时候 就把成功的回调和失败的回调分开存放
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(() => {
                        try{
                            let x = onFufilled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    })
                });
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(() => {
                        try{
                            let x= onRejected(this.reason);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    });
                });
            }
        }) 
        return promise2
    }
}
module.exports = Promise;

// 今天是第一天 2 4 8-10  周六全天  3个月
// 下午是三点开始 