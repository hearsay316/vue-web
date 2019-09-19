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
  // router.__proto__ = proto;
  Object.setPrototypeOf(router,proto);
  return router;
}
let proto = Object.create(null);

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

// 处理请求到来时的函数
proto.handle = function(req, res, done) {
  let { pathname } = url.parse(req.url);
  // 需要遍历 stack 先取出第一个
  let idx = 0;
  let next = err => {
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
      console.log(layer.path,pathname)
      if (layer.match(pathname)) {
        // 路径匹配到了
        if (!layer.route ) {
          // 说明他是中间件
          if(layer.handler.length === 4){
            next();
          }else{
            layer.handler(req, res, next);
          }
        } else {
          // 如果是路由 需要匹配方法
          if (layer.route.handle_method(req.method)) {
            layer.handler(req, res, next);
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



