function EventEmitter(){
    this["_events"] = {};
}

EventEmitter.prototype.on = function (eventName,callBack) {
    if (!this._events) this._events = Object.create (null);
    if(eventName !=="newListener")this._events["newListener"]?this._events["newListener"].forEach(fn=>fn(eventName)):void 0;
    this._events[eventName]?this._events[eventName].push(callBack):this._events[eventName] = [callBack]
};
EventEmitter.prototype.off = function (eventName,callBack) {
    this._events[eventName]?this._events[eventName]=this._events[eventName].filter(fn=> fn!==callBack&&fn.l!==callBack):null
};
EventEmitter.prototype.once = function(eventName,callback){
    function one() {
        callback(...arguments);
        this.off(eventName,one)
    }
    one.l = callback;
  this.on(eventName,one);
};
EventEmitter.prototype.emit = function(eventName){
    this._events[eventName]? this._events[eventName].forEach (fn => fn.call (this, ...arguments)):void 0
};
module.exports = EventEmitter;