// 我的代码可以保证成功和失败不会同时触发
let resolvePromise = (promise2,x,resolve,reject) => { 
    if(promise2 === x){ 
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // 如果调用了失败 就不能再调用成功 调用成功也不能再调用失败
    let called;
    if(typeof x ==='function'  || (typeof x === 'object' && x!== null) ){
        try{
            let then = x.then; // Object,dedefineProperty
            if(typeof then === 'function'){ 
                then.call(x,(y)=>{   // x.then(y=>,err=>)
                    if(called) return;
                    called = true 
                    // y有可能解析出来的还是一个promise
                    // 在去调用resolvePromise方法 递归解析的过程
                    resolvePromise(promise2,y,resolve,reject); // 总有y是普通值的时候
                },e=>{
                    if(called) return;
                    called = true 
                    reject(e);
                })
            }else{ // {} {then:{}}
                resolve(x); // 普通值 直接抛出去就可以了
            }
        }catch(e){
            if(called) return;
            called = true 
            reject(e);
        }
    }else{
        resolve(x);  // '123'  123
    }
}
class Promise{
    constructor(executor){
        this.value = undefined; 
        this.reason = undefined; 
        this.status = 'pending';
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value) =>{ // 如果resolve的值时一个promise
            // if(typeof value === 'function' || (typeof value == 'object'&&value !== null)){
            //     if(typeof value.then == 'function'){
            //         return value.then(resolve,reject)
            //     }
            // }
            if(value instanceof Promise){
                // 我就让这个promise执行，把成功的结果再次判断
                return value.then(resolve,reject)
            }
            if(this.status === 'pending'){
                this.status = 'fulfilled'
                this.value = value;
                this.onResolvedCallbacks.forEach(fn=>fn());
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
            console.log(e)
            reject(e);
        }
    }
    then(onFufilled,onRejected){ 
        // 可选参数的配置
        onFufilled = typeof onFufilled === 'function'?onFufilled:value=>value;
        onRejected = typeof onRejected === 'function'?onRejected:err=>{throw err}
        let promise2 = new Promise((resolve,reject)=>{
            if(this.status === 'fulfilled'){
                setTimeout(()=>{ // 为了保证promise2 已经产生了
                    try{
                        let x = onFufilled(this.value);
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
            if(this.status === 'pending'){
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
    catch(errCallback){ // catch是then的一个别名而已
        return this.then(null,errCallback)
    }
    static resolve(value){
        return new Promise((resolve,reject)=>{
            resolve(value);
        })
    }
    static reject(err){
        return new Promise((resolve,reject)=>{
            reject(err);
        })
    }
}
Promise.defer = Promise.deferred = () => { // 测试方法
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd; // 可以检测这个对象上的promise属性 resolve方法 reject方法
}
module.exports = Promise; 


// 全局安装 只能在命令中使用  sudo npm install promises-aplus-tests -g
// promises-aplus-tests promise.js
// 本地安装 可以在命令下 和 我们的代码中使用
