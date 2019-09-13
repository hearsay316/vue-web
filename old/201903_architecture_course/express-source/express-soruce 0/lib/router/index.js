const Route = require('./route');
const Layer = require('./layer.js');
// 这个类 就是整个的路由系统

function Router (){
    this.stack = [];
}
// 一调用get方法 我们需要创造一个个layer，而且每个layer上应该有一个route，还要将get方法中的handler 传入到route中，route中将handler存起来
// 创建route和 layer的关系
Router.prototype.route = function(path){
    let route = new Route();
    // 如果layer的路径匹配到了就教给route来处理
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route; // 把route放到layer上
    this.stack.push(layer);// 把layer放到数组中
    return route;
}
Router.prototype.get = function(path,handler){
    let route = this.route(path);
    route.get(handler); // 把handler传递给route自身去处理
}
Router.prototype.handle = function(req,res,out){

}
module.exports = Router;
