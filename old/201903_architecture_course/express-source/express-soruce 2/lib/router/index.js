const Route = require('./route');
const Layer = require('./layer.js');
// 这个类 就是整个的路由系统
let url = require('url');
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
Router.prototype.get = function(path,handlers){
    let route = this.route(path);
    route.get(handlers); // 把handler传递给route自身去处理
}
Router.prototype.handle = function(req,res,out){
    let {pathname} = url.parse(req.url);
    // 请求到来的时候 会执行此方法
    let idx = 0;
    let next = () =>{
        if(idx>=this.stack.length) return out();
        let layer = this.stack[idx++];
        if(layer.match(pathname)){ // 判断当前的layer是否匹配到当前的请求路径
            // route.dispatch方法
            layer.handle_request(req,res,next); // next 方法是外层的下一层
        }else{
            next();
        }
    }
    next();
}
module.exports = Router;
