function Layer(path,handler){
    this.path = path;
    this.handler = handler
}
// 用来匹配路径
Layer.prototype.match = function(pathname){
    return this.path === pathname;
}
module.exports = Layer;