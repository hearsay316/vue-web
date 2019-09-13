// 主要用来创建应用的
let http = require('http');
let Router = require('./router');
let methods = require('methods');
// Application 就是express整个的应用系统

// 希望将我们的应用和路由系统进行分离操作

function Application(){
    // 内部放置了一个路由洗头
}
Application.prototype._lazyRoute = function(){ // 为了实现不是一加载express 就创建路由，而是调用了 方法才去创建
    if(!this._router){
        this._router = new Router(); // 路由系统的懒加载
    }
}
Application.prototype.param = function(){
    this._lazyRoute();
    this._router.param(...arguments);
}
// 新增use方法,自己不处理，交给路由系统处理
Application.prototype.use = function(){
    this._lazyRoute();
    this._router.use(...arguments);
}

methods.forEach(method=>{
    Application.prototype[method] = function(path,...handlers){
        this._lazyRoute();
        this._router[method](path,handlers);
    }
})

Application.prototype.listen = function(){
    let server =  http.createServer((req,res)=>{
        // 如果路由系统中处理不了这个请求 就让他调用done方法
        this._lazyRoute(); 
        function done(){
            res.end(`Cannot ${req.url} ${req.method}`)
        }
        this._router.handle(req,res,done);
    });
    server.listen(...arguments);
}
module.exports = Application;

