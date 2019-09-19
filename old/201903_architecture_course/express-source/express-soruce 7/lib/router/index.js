const Route = require('./route');
const Layer = require('./layer.js');
// 这个类 就是整个的路由系统
let url = require('url');
let methods = require('methods');
function Router (){ // 如果调用这个函数 会返回一个路由系统
    function router(req,res,next){
        router.handle(req,res,next);
    }
    router.stack = [];
    router.paramsCallback = {};
    Object.setPrototypeOf(router,proto);//router.__proto__ = proto
    // 让当前的router继承 
    return router; // 如果类返回了一个引用类型 那么这个引用类型 会作为他的this指向
}
// 一调用get方法 我们需要创造一个个layer，而且每个layer上应该有一个route，还要将get方法中的handler 传入到route中，route中将handler存起来
// 创建route和 layer的关系
let proto = Object.create(null);
proto.param = function(name,handler){ // 订阅
    if(this.paramsCallback[name]){ // events.on
        this.paramsCallback[name].push(handler);
    }else{
        this.paramsCallback[name] = [handler]
    }
}
proto.route = function(path){
    let route = new Route();
    // 如果layer的路径匹配到了就教给route来处理
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route; // 把route放到layer上
    this.stack.push(layer);// 把layer放到数组中
    return route;
}
proto.use = function(path,handler){
    if(typeof handler !== 'function'){ // 做参数处理 如果没有path path就是/
        handler = path;
        path = '/'
    }
    let layer = new Layer(path,handler);
    layer.route = undefined;  // 如果没有route 就是中间件
    this.stack.push(layer);
}
methods.forEach(method=>{
    proto[method] = function(path,handlers){
        let route = this.route(path);
        route[method](handlers); // 把handler传递给route自身去处理
    }
});
proto.process_params = function(layer,req,res,done){ // 预先处理参数方法
    // 如果这个路由就是普通路由 没有keys 
    if(!layer.keys  || layer.keys.length === 0 ){
        return done();
    }
    let keys = layer.keys; // [{id},{name}]  {id:[],name:[]}
    let idx = 0,callbacks,key,value  
    let param = () =>{
       if(idx>=keys.length) return done();
       let prop =  keys[idx++];
       key = prop.name; // id;
       value = layer.params[key];
       callbacks = this.paramsCallback[key]; // {id:[fn,fn]}
       if(!callbacks){
            return param();
       }
       // 如果找到了执行队列 开始执行队列
       execCallback();
    }
    let i = 0;
    let execCallback = () =>{
        let cb = callbacks[i++]; // 如果取不到就出去
        if(!cb){
            i= 0;
            return param(); // 继续迭代上一层
        }
        cb(req,res,execCallback,value,key);
    }
    param();
}
proto.handle = function(req,res,out){
    let {pathname} = url.parse(req.url); // /add
    // 请求到来的时候 会执行此方法
    let idx = 0,removed = '',slashed = false
    let next = (err) =>{ // 如果路由的next方法出错了 会把这个错误抛到外层,如果中间件出错了 调用的正好就是这个next方法
        if(removed.length>0 && slashed){
            req.url = removed + req.url;
        }
        if(idx>=this.stack.length) return out();
        let layer = this.stack[idx++]; // 这个layer可能会有route属性
        // 无论是中间件还是路由 都要匹配到路径才能执行
        if(err){ // 有错误需要找错误处理中间件
            // 是不是中间件 ，如果是中间件 在找是不是错误中间件
            if(!layer.route){
                layer.handle_error(err,req,res,next);
            }else{
                next(err); // 这不是中间件，继续传递错误
            }
        }else{
            if(layer.match(pathname)){
                if(!layer.route){ // 是中间件 直接调用他自己的handler方法
                    // 如果是中间件 需要把路径进行处理
                    removed = layer.path; // 把中间件的路径存起来  /user  /user/add
                    if(removed !== '/'){ // 是中间件 就不要删除/了
                        req.url = req.url.slice(removed.length);
                        slashed = true;
                    }
                    layer.handle_request(req,res,next);
                }else{
                    if(layer.route.handle_method(req.method)){
                        req.params = layer.params;
                        // 在处理路由之前 需要发布刚才订阅的事件
                        // 把参数都处理好 ，把订阅的事情都处理
                        // layer.keys 我可以去route上查找 paramsCallback
                        // [{name:id},{name:name}]
                        this.process_params(layer,req,res,()=>{
                            layer.handle_request(req,res,next);
                        });
                    }else{
                        next();
                    }
                }
            }else{
                next();
            }
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
