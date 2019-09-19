let http =require('http');
let url = require('url');
let methods = require('methods');
let path = require('path');
function application(){
    let app = (req,res)=>{
       let {pathname} = url.parse(req.url,true);
       let method = req.method.toLowerCase();
       // 遍历数组中的每一层 如果方法和路径 匹配到了 执行此函数
       let index = 0;
       function next(err){
           if(index === app.routes.length) return res.end(`Cannot ${method.toUpperCase()} ${pathname}`)
            let {method:m,path:p,handler:h} = app.routes[index++];
            if(err){
                // 如果有错误 就找 错误处理中间件
                if(m === 'middleware' && h.length === 4){
                    return h(err,req,res,next);
                }else{ // 如果不是错误处理就带着错误继续向下执行
                    next(err);
                }
            }else{
                if(m === 'middleware'){
                    // 判断路径  '/'   /    /user /u/  
                    if(p === pathname || pathname.startsWith(p+'/') || p=='/' ){
                        return h(req,res,next);
                    }else{
                        next();
                    }
                }else{
                    if(p instanceof RegExp){ // 如果是一个正则的话
                        if(p.test(pathname)){ // 如果能匹配到 
                            let [,...values] = pathname.match(p); //  如果可以匹配到 
                            // 就组合成一个对象
                            req.params = p.keys.reduce((memo,current,index)=>(memo[current]=values[index],memo),{});
                            h(req,res);
                        }
                    }else{
                        if( (method === m || m == 'all') && ( pathname === p || p == '*')){
                            return h(req,res);
                        }
                    }
                    next();
                }
            }
            
       }
       next();
       //for(let i = 0 ; i < app.routes.length;i++){
           
      // }
       // 没有找到就返回not found
     
    }
    app.routes = []; //每次调用get方法 都存一次
    app.listen = function(){
        let server = http.createServer(app);
        server.listen(...arguments)
    };
    [...methods,'all'].forEach(method => {
        app[method] = function(p,callback){
            // 调用get方法的时候 p可能会有: 那就说明是一个路径参数
            if(p.includes(':')){
                let keys = [];
                p = p.replace(/:([^\/]+)/g,function(){
                    keys.push(arguments[1]); // ['name','age]
                    return "([^\/]+)"
                });
                p = new RegExp(p); // 转化成正则,把遍历出来的参数 放到keys属性上
                p.keys = keys;
            }
            app.routes.push({
                method,
                path:p,
                handler:callback
            }); 
        }
    });
    app.use = function(p,callback){
        if(typeof callback !== 'function'){
            callback = p;
            p = '/';
        }
        app.routes.push({
            method:'middleware', // 这一个中间件
            path:p,
            handler:callback
        }); 
    }
    // 默认先注册一个中间件 ，扩展 req和res的属性和方法
    app.use((req,res,next)=>{
        req.path = require('url').parse(req.url).pathname;
        res.send = function(value){
            if(Buffer.isBuffer(value)|| typeof value === 'string'){
                res.setHeader('Content-Type','text/plain;charset=utf8');
                res.end(value);
            }else if(typeof value === 'object'){
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify(value));
            }else if(typeof value === 'number'){
                res.statusCode = value;
                let obj = {
                    404:'Not Found',
                }
                res.end(obj[value])
            }
        }
        res.json = function(json){
            res.send(json);
        }
        res.sendFile = (p,options)=>{
            filePath = p;
            if(options){
                let filePath = path.join(options.root,p);
            }    
            require('fs').createReadStream(filePath).pipe(res);
        }
        next();
    })

    return app
}

module.exports = application
// webpack 1 应用  优化    周末 复杂一些的express
// 多层路由  express  + ejs  中间件 其它的 koa-bodyparser

// webpack 讲完
// react 全家桶。。。。 2周多

console.log(require('_http_status'));


