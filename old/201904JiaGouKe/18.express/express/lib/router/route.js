let Layer = require('./layer');
let methods = require('methods');
function Route(){
    this.stack = [];
    this.methods = {}; //用来标示一下 当前route中是否有此方法
}
methods.forEach(method=>{
    Route.prototype[method] = function(handles){
        // 传递是多个函数 那就创建多个层
        handles.forEach(handle => {
            let layer = new Layer('/',handle);
            layer.method = method;
            this.methods[method] = true; // Route.methods = {get:true,post:true}
            this.stack.push(layer);
        });
    }
})

Route.prototype.dispatch = function(req,res,out){
    let idx = 0;
    let next = (err)=>{
        if(err) return out(err);
        if(idx>= this.stack.length) return out();
        let layer = this.stack[idx++];
        if(layer.method === req.method.toLowerCase()){
            layer.handler(req,res,next);// 把下一次调用的权利给了用户
        }else{ // 如果方法匹配不到就继续向下找
            next();
        }
    }
    next();
}
Route.prototype.handle_method = function(method){
    method = method.toLowerCase();
    return this.methods[method];
}
module.exports = Route;