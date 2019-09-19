let Layer = require('./layer');
function Route(){
    this.stack = [];
}
Route.prototype.get = function(handlers){
    // 给route中添加层，这个层中需要存放方法名和 handler
    handlers.forEach(handler => {
        let layer = new Layer('/',handler);
        layer.method = 'get';
        this.stack.push(layer);
    });
}
Route.prototype.dispatch = function(req,res,out){
    let idx = 0;
    let next = () =>{ // 此next方法是用户调用的next，如果调用next 会执行内层中的next方法，如果没有匹配到会调用外层的next方法
        if(idx>= this.stack.length) return out();
        let layer = this.stack[idx++];
        // 如果当前route中的layer的方法匹配到了 执行此layer上的handler
        if(layer.method === req.method.toLowerCase()){
            layer.handle_request(req,res,next); // layer.handler
        }else{
            next();
        }
    }
    next();
}
module.exports = Route;