// 主要用来创建应用的
let http = require('http');
let Router = require('./router');
let methods = require('methods');
let init = require('./middleware/init');
let query = require('./middleware/query');
// Application 就是express整个的应用系统

// 希望将我们的应用和路由系统进行分离操作
function Application(){
    // 内部放置了一个路由洗头
    this.settings = {}; // 内部的设置项
    this.engines = {
        // view:'',
        // engine:'',
        // ext:''
    };
    // 默认初始化应用的时候 就初始化一个中间件
    this.init(); // 默认放到了 lazyRoute上
}
// 手动设置 自定义的参数  
Application.prototype.init = function(){
    // 初始化默认的中间件
    this.use(init.call(this)); // 把中间件注册上
    this.use(query.call(this));
}
Application.prototype.set = function(key,value){
    if(arguments.length === 2){ // 根据传递的参数个数区分是设置还是获取
        return  this.settings[key] = value;
    }
    return this.settings[key]
}
// 存储要渲染的信息
Application.prototype.engine = function(extname,renderFn){
    // 保证扩展名是有.html
    let view = this.get('views');
    let engine = this.get('view engine'); // html
    
    extname = extname[0] == '.'? extname :'.'+extname;

    this.engines['view'] = view; // 渲染的路径  xxxx/view
    this.engines['engine'] = engine; // 渲染的路径  html
    this.engines['ext'] =  {[extname]:renderFn}// .html

    // {view:渲染的路径 ,engine:html,ext:{.html:fn}}
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
        if(method === 'get' && arguments.length == 1){
            return this.set(arguments[0]);
        }
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

