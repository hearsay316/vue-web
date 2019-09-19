let pathToRegExp = require('path-to-regexp');
function Layer(path,handler){
    this.path = path;
    this.handler = handler; 

    // 不管是中间件还是路由 都是支持正则 匹配路由
    
    this.regexp = pathToRegExp(this.path,this.keys=[]);
}
// 用来匹配路径
Layer.prototype.match = function(pathname){ 
    // 中间件
    if(this.path === pathname){
        return true
    }  
    if(this.route){ // /user/1/2    this.regexp 
        let matches = pathname.match(this.regexp);
        if(matches){
            let values = matches.slice(1);
            this.params = this.keys.reduce((memo,current,index)=>{
                memo[current.name] = values[index];
                return memo;
            },{});
            return true
        }
    }
    if(!this.route){
        if(this.path === '/'){ // 中间件全都匹配
            return true
        }
        // 如果中间件 以当前的请求路径开头 表示也可以匹配到
        return pathname.startsWith(this.path+'/');
    }
    return false;
}
Layer.prototype.handle_error = function(err,req,res,next){
    if(this.handler.length === 4){
        return this.handler(err,req,res,next);
    }
    next(err); // 普通中间件继续执行即可
}
module.exports = Layer;