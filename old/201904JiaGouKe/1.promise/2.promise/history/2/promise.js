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
    then(onFufilled,onRejected){ 
        if(this.status === 'fulfilled'){
            onFufilled(this.value);
        }
        if(this.status === 'rejected'){
            onRejected(this.reason);
        }
        // ____________ 上面是处理同步逻辑的，下面是异步逻辑
        if(this.status === 'pending'){
            // 如果当前的状态是pending的时候 就把成功的回调和失败的回调分开存放
            this.onResolvedCallbacks.push(()=>{
                onFufilled(this.value)
            });
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason);
            });
        }
    }
}
module.exports = Promise;