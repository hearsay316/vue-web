class Layer{
    constructor(path,method,callback){
        this.path = path;
        this.method = method;
        this.callback = callback;
    }
    match(method,path){
        return this.method === method.toLowerCase() && this.path === path;
    }
}
class Router{
    // 原理基于koa
    constructor(){
        this.routeMiddleware = [];
    }
    get(path,callback){
        let layer = new Layer(path,'get',callback);
        this.routeMiddleware.push(layer)
    }
    compose(matchRoute,ctx,next){
        function dispatch(index){
            if(index === matchRoute.length) return Promise.resolve();
            if(index === matchRoute.length) return next();
            let route = matchRoute[index].callback;
            return Promise.resolve(route(ctx,()=>dispatch(index+1)));
        }
        return dispatch(0);
    }
    routes(){
        return (ctx,next)=>{
            let method = ctx.method;
            let path = ctx.path;
            let matchRoute = this.routeMiddleware.filter(layer=>{
                return layer.match(method,path)
            });
            // 组合函数  reduce方法来写一个
            this.compose(matchRoute,ctx,next).then(()=>{
                console.log('compose ok')
            })
        }
    }
}
module.exports = Router;