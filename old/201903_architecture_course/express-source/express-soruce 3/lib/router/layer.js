function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
// 做路径匹配的方法 后续会继续扩展
Layer.prototype.match = function(pathname){
    if(this.path === pathname){
        return true
    }
    if(!this.route){ // 中间件匹配开头即可  /user/add   /user/
        if(this.path == '/'){
            return true;
        }
        return pathname.startsWith(this.path+'/')
    }
    return false;
}
Layer.prototype.handle_request = function(req,res,next){
    // todo ..
    this.handler(req,res,next);
}
module.exports = Layer;