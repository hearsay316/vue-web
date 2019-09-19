let Layer = require("./layer");
let Route = require("./route");
let url = require("url");
let methods = require("methods");
function Router() { // 借用了 new 一个类如果返回一个引用类型 那这个返回的结果会作为当前的实例
  // 维护所有的layer
  let router = (req,res,next)=>{ // 默认express.Router 返回的是一个中间件函数
     // router函数要
     router.handle(req,res,next); 
  }
  router.stack = [];
  router.paramsCallback = {}; // 维护映射关系
  // router.__proto__ = proto;
  Object.setPrototypeOf(router,proto);
  return router;
}
let proto = Object.create(null);

proto.param = function(key,handler){
  if(this.paramsCallback[key]){
    this.paramsCallback[key].push(handler)
  }else{
    this.paramsCallback[key] = [handler]
  }
}
proto.route = function(path) {
  // route方法返回了route实例 并且让当前的layer和route产生了关联
  let route = new Route();
  let layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route; // 为了可以同过层获取到route
  this.stack.push(layer);
  return route;
};
proto.use = function(path, handle) {
  if (typeof handle !== "function") {
    handle = path;
    path = "/";
  }
  let layer = new Layer(path, handle);
  layer.route = undefined; // 没有route属性
  this.stack.push(layer);
};
methods.forEach(method => {
  proto[method] = function(path, handles) {
    if(!Array.isArray(handles)){ // 如果二级路由直接调用get方法，采用同样的方式来处理
      handles = Array.from(arguments).slice(1);
    }
    // 创建一层 把路径和dispatch传给这个layer
    let route = this.route(path);
    route[method](handles);
  };
});
proto.process_param = function(layer,req,res,done){
  // 没有key的时候 说明当前路由不是有路径参数的路由
  if(!layer.keys || layer.keys.length ==  0){
    return done();// 直接走路由即可
  }
  let keys = layer.keys;
  let idx = 0;
  let callbacks = [];
  let value;
  let key;
  let param = ()=>{
    if(idx >= layer.keys.length) return done();
    key = keys[idx++].name;  // [id,name]
    value = layer.params[key];
    callbacks = this.paramsCallback[key];
    if(!callbacks || (callbacks && callbacks.length ==0)){
      return param();
    }
    execCallback();
  }
  let i = 0; // id 2  // age 
  function execCallback(){
    // [fn fn]
    let cb = callbacks[i++];
    if(!cb){
      i = 0;
      return param(); // 本次自己的执行完毕 就执行下一个人
    }
    cb(req,res,execCallback,value,key);
  }
  param();
}
// 处理请求到来时的函数
proto.handle = function(req, res, done) {
  let { pathname } = url.parse(req.url);
  // 需要遍历 stack 先取出第一个
  let idx = 0;
  let removed = '';
  let next = err => {
    if(removed.length>0){ // 进入到中间件的时候 删除了路径，但是走到下一层的时候需要在将removed 拼接回来
      req.url = removed + req.url;
    }
    // 无论路由报错 还是中间件出错 最后err都会在这里统一补货

    if (idx >= this.stack.length) return done();
    let layer = this.stack[idx++];
    if (err) {
        // 有错误需要跳过所有的普通中间件和路由 找到错误中间件‘
        if(!layer.route){
            layer.handle_error(err,req,res,next);
        }else{
            next(err); // 继续向下找传递错误
        }
    } else {
      // layer 可能是中间件 还有可能是路由
      if (layer.match(pathname)) {
        // 路径匹配到了
        if (!layer.route ) {
          // 说明他是中间件
          if(layer.handler.length === 4){
            next();
          }else{
            // 这里是中间件逻辑 如果匹配到后 需要把这一层删除掉
            // /user /user/add  
            if(layer.path !== '/'){
              removed = layer.path;
              req.url = req.url.slice(removed.length); // 删除对应的中间件的路径
            }
            layer.handler(req, res, next);
          }
        } else {
          // 如果是路由 需要匹配方法
          if (layer.route.handle_method(req.method)) {
            console.log('match')
            this.process_param(layer,req,res,()=>{
              // 当订阅的方法执行到底部在去执行真正的路由逻辑
              req.params = layer.params;
              layer.handler(req, res, next);
            })
          } else {
            next();
          }
        }
      } else {
        next();
      }
    }
    // if(layer.match(pathname) && layer.route.handle_method(req.method)){
    //     // 将next 函数传递到dispatch方法中，内部调用next 就会冲route出来，进到下一个layer
    //     layer.handler(req,res,next); // dispatch
    // }else{
    //     next();
    // }
  };
  next();
};
module.exports = Router;
// 中间件路径处理
// 路径参数
// 模板引擎
// 内置中间件



