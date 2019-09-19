let Layer = require('./layer');
let Route = require('./route');
let url = require('url');
let methods = require('methods');
function Router(){
    this.stack = [];
    // 维护所有的layer
}
Router.prototype.route = function(path){ // route方法返回了route实例 并且让当前的layer和route产生了关联
    let route = new Route();
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route; // 为了可以同过层获取到route 
    this.stack.push(layer);
    return route;
}
methods.forEach(method=>{
    Router.prototype[method] = function(path,handles){
        // 创建一层 把路径和dispatch传给这个layer
        let route = this.route(path);
        route[method](handles)
    }
})

// 处理请求到来时的函数
Router.prototype.handle = function(req,res,done){
    let {pathname} = url.parse(req.url);
    // 需要遍历 stack 先取出第一个
    let idx = 0;
    let next = () =>{
        if(idx>= this.stack.length) return done();
        let layer = this.stack[idx++];
        if(layer.match(pathname) && layer.route.handle_method(req.method)){
            // 将next 函数传递到dispatch方法中，内部调用next 就会冲route出来，进到下一个layer
            layer.handler(req,res,next); // dispatch
        }else{
            next();
        }
    }
    next();
}
module.exports = Router