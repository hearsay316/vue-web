// 主要用来创建应用的
let http = require('http');
let url = require('url');
let Router = require('./router')
// Application 就是express整个的应用系统

// 希望将我们的应用和路由系统进行分离操作

function Application(){
    // 内部放置了一个路由洗头
    this._router = new Router();
}
Application.prototype.get = function(path,handler){
    this._router.get(path,handler);
    // this._router.push({
    //     path,
    //     method:'get',
    //     handler
    // })
}
Application.prototype.listen = function(){
    let server =  http.createServer((req,res)=>{
        // 如果路由系统中处理不了这个请求 就让他调用done方法
        function done(){
            res.end(`Cannot ${req.url} ${req.method}`)
        }
        this._router.handle(req,res,done);
        // let {pathname} = url.parse(req.url);
        // for(let i = 1 ;i< this._router.length;i++){
        //   let {path,method,handler} = this._router[i];
        //   if(path === pathname && method === req.method.toLowerCase()){
        //       return handler(req,res);
        //   }
        // }
        // return this._router[0].handler(req,res);
    });
    server.listen(...arguments);
}
module.exports = Application;

