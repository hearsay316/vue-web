let pathToRegExp = require('path-to-regexp');
function Layer(path,handler){
    this.path = path;
    this.handler = handler;

    // path  把每一层中的路径转化成正则  /:id/:name   =[{name:'id'},{name:'name'}]
    // 如果当前有keys.length属性 那说明他是一个带有路径参数的
    this.regexp = pathToRegExp(this.path, this.keys = [])
}
// 做路径匹配的方法 后续会继续扩展
Layer.prototype.match = function(pathname){
    if(this.path === pathname){
        return true
    }
    if(this.route){ // 如果是路由 看一下当前layer的 this.regexp 能不能匹配到pathname    /user/1/2   /user/(?:([^\/]+?))/(?:([^\/]+?))
        let matches = pathname.match(this.regexp); // [/user/1/2,1,2]
        if(matches){ // 如果路径和当前的请求路径匹配到了 进入路由
            this.params = {};
            let keys = this.keys;
            for(let i = 1 ;i<matches.length;i++){
                let value = matches[i];
                let key = keys[i-1].name;
                this.params[key] = value; // 把路径参数匹配好后放到自己的params属性上
            }
            return true;
        }
    }
    if(!this.route){ // 中间件匹配开头即可  /user/add   /user/
        if(this.path == '/'){
            return true;
        }
        return pathname.startsWith(this.path+'/')
    }
    return false;
}
Layer.prototype.handle_error = function(err,req,res,next){
    if(this.handler.length!==4){ // 不是错误处理中间件
        return  next(err);
    }
    this.handler(err,req,res,next); // 是错误处理中间件 就调用当前layer上的handler
}
Layer.prototype.handle_request = function(req,res,next){
    // todo ..
    this.handler(req,res,next);
}
module.exports = Layer;