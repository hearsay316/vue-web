let http = require('http');
let url = require('url');
let  Router = require('./router/index');
let methods = require('methods');
let middleware = require('./middleware/init');
let query = require('./middleware/query');
console.log(methods);
function Application(){
    this.settings  = {};
    this.engines = {};
}
Application.prototype.engine = function(extension,fn){
    this.engines[extension] = fn;
}
Application.prototype.set = function(key,value){
    if(arguments.length === 1){
        return this.settings[key]
    }
    this.settings[key] = value;
}
// 订阅函数
Application.prototype.param = function(key,handler){
    this.lazy_route();
    this._routers.param(key,handler);
}
Application.prototype.lazy_route = function(){
    if(!this._routers){ // 晚些初始化路由系统
        this._routers = new Router;
        this._routers.use(middleware.init(this));
        this._routers.use(query());
    }
}
Application.prototype.use = function(){
    this.lazy_route();
    this._routers.use(...arguments); // 当前应用不处理use逻辑，交给路由系统处理
}
// get / post /delete
methods.forEach(method=>{
    Application.prototype[method] = function(path,...handles){
        if(method === 'get' && arguments.length === 1){ // 如果你调用的是get 接着回去操作
            return this.set(path);
        }
        this.lazy_route();
        this._routers[method](path,handles);
        // this._routers.push({
        //     path,
        //     method:'get',
        //     handle
        // });
    }
});

Application.prototype.listen = function(){
    let server = http.createServer((req,res)=>{
        this.lazy_route(); // 请求到来的时候 加载路由系统，不是一listen就出事话了
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`);
        }
        this._routers.handle(req,res,done);
        // let {pathname} = url.parse(req.url);
        // for(let i = 1; i<this._routers.length; i++){
        //     let {path,method,handle} = this._routers[i];
        //     if(path === pathname && req.method.toLocaleLowerCase() === method){
        //         return handle(req,res);
        //     }
        // }
        // return this._routers[0].handle(req,res);
    });
    server.listen(...arguments);
}
module.exports = Application



