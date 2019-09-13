const Route = require('./route');
const Layer = require('./layer.js');
// 这个类 就是整个的路由系统
let url = require('url');
let methods = require('methods');
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
Router.prototype.use = function(path,handler){
    if(typeof handler !== 'function'){ // 做参数处理 如果没有path path就是/
        handler = path;
        path = '/'
    }
    let layer = new Layer(path,handler);
    layer.route = undefined;  // 如果没有route 就是中间件
    this.stack.push(layer);
}
methods.forEach(method=>{
    Router.prototype[method] = function(path,handlers){
        let route = this.route(path);
        route[method](handlers); // 把handler传递给route自身去处理
    }
})
Router.prototype.handle = function(req,res,out){
    let {pathname} = url.parse(req.url);
    // 请求到来的时候 会执行此方法
    let idx = 0;
    let next = () =>{
        if(idx>=this.stack.length) return out();
        let layer = this.stack[idx++]; // 这个layer可能会有route属性
        // 无论是中间件还是路由 都要匹配到路径才能执行
        if(layer.match(pathname)){
            if(!layer.route){ // 是中间件 直接调用他自己的handler方法
                layer.handle_request(req,res,next);
            }else{
                if(layer.route.handle_method(req.method)){
                    layer.handle_request(req,res,next);
                }else{
                    next();
                }
            }
        }else{
            next();
        }

        // 如果路径相同 并且内部的route可以支持此方法 在进入到内层的stack去判断
        // if( && ){ // 判断当前的layer是否匹配到当前的请求路径
        //     // route.dispatch方法
        //     layer.handle_request(req,res,next); // next 方法是外层的下一层
        // }else{
        //     next();
        // }
    }
    next();
}
module.exports = Router;
