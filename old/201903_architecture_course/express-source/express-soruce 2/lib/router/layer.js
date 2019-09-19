function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
// 做路径匹配的方法 后续会继续扩展
Layer.prototype.match = function(pathname){
    return this.path === pathname;
}
Layer.prototype.handle_request = function(req,res,next){
    // todo ..
    this.handler(req,res,next);
}
module.exports = Layer;