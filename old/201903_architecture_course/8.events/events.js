function EventEmitter(){
    this._events = Object.create(null)
}
// {newListener:[callback]} 
EventEmitter.prototype.on = function(eventName,callback){
    if(!this._events) this._events = {}
    if(eventName !== 'newListener'){
        // 可以监听绑定的方法
        this.emit('newListener',eventName);
    }
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback]
    }
}
// girl.once(eventName,()=>{}) // {'失恋':[]}
EventEmitter.prototype.once = function(eventName,callback){
    function one(){
        callback();
        this.off(eventName,one)
    }
    one.l = callback;
    this.on(eventName,one);
}
EventEmitter.prototype.emit = function(eventName,...args){
    if(this._events[eventName]){
        this._events[eventName].forEach(callback => {
            callback.call(this,...args);
        });
    }
}
EventEmitter.prototype.off = function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(fn=>{
            return fn != callback && fn.l !==callback
        })  
    }
}
module.exports = EventEmitter