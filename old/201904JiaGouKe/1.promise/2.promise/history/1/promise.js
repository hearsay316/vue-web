class Promise{

    constructor(executor){
        this.value; // 成功的原因
        this.reason; // 失败的原因
        // 只有状态是pending的时候 才能去更改状态
        this.status = 'pending' //默认状态有三种
        let resolve = (value) =>{ // 如果成功就不能失败
            if(this.status === 'pending'){
                this.status = 'fulfilled'
                this.value = value;
            }
        }
        let reject = (reason) =>{// 如果失败就不能再更该状态
            if(this.status === 'pending'){
                this.status = 'rejected'
                this.reason = reason;
            }
        }   
        try{ // 如果执行的时候出错 直接走到失败态
            // executor 就是一个函数 提供给用户两个参数 ，用户可以选择执行成功还是失败
            executor(resolve,reject);
        }catch(e){
            reject(e);
        }
    }
    then(onFufilled,onRejected){ // 如果then的时候 根据当前状态执行成功或者失败
        if(this.status === 'fulfilled'){
            onFufilled(this.value);
        }
        if(this.status === 'rejected'){
            onRejected(this.reason);
        }
    }
    
}

module.exports = Promise;