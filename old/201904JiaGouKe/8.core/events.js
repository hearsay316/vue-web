function EventEmitter(){
    this._events = Object.create(null);
}
EventEmitter.prototype.on = function(eventName,callback){
    if(!this._events) this._events = Object.create(null);

    // 如果用户绑定的不是newListener 让newListener的回调函数执行
    if(eventName !== 'newListener'){
        if(this._events['newListener']){
            this._events['newListener'].forEach(fn=>fn(eventName))
        }
    }
    if(this._events[eventName]){
            this._events[eventName].push(callback)
        }else{
            this._events[eventName] = [callback]; // {newListener:[fn1]}
    }
}
EventEmitter.prototype.once = function(eventName,callback){
    let one = (...args)=>{
        callback.call(this,...args);
        // 删除掉这个函数
        this.off(eventName,one); // 执行完后在删除掉
    }
    one.l = callback; // one.l = fn;
    // 先绑定一个once函数，等待emit触发完后执行one函数 ，执行原有的逻辑，执行后删除once函数
    this.on(eventName,one);
}
EventEmitter.prototype.emit = function(eventName,...args){
    if(this._events[eventName]){
        this._events[eventName].forEach(fn => {
            fn.call(this,...args);
        });
    }
}
// 去数组中删除
EventEmitter.prototype.off = function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(fn=>{
            return fn!=callback && fn.l !== callback
        });
    }
}
module.exports = EventEmitter;

// let fn1 = (next)=>{
//     setTimeout(() => {
//         console.log(1)
//         next();
//     }, 1000);
// }
// let fn2 = ()=>{
//     setTimeout(() => {
//         console.log(2)
//         next();
//     }, 2000);
// }
// let fn3 = ()=>{
//     setTimeout(() => {
//         console.log(3)
//         next();
//     }, 2000);
// }
// let fns = [fn1,fn2,fn3];
// let index = 0;
// function next(){ // compose => promise
//     let fn = fns[index++] 
//     fn(()=>next());
// }
// next();