class Layer {
    constructor(p,callback,method){
        this.path = p;
        this.callback = callback;
        this.method = method;
    }
    match(path,method){
        return this.path == path && this.method == method;
    }
}
class Router{
    constructor(){
        this.stack = [];
    }
    get(path,callback){
        let layer = new Layer(path,callback,'GET');
        this.stack.push(layer);
    }
    compose(stacks,ctx,next){
        async function dispatch(idx){
            // 如果到最后继续next 那么就回到原来koakoa中的next方法
            if(idx === stacks.length) return next();
            let layer = stacks[idx];
            return layer.callback(ctx,()=>dispatch(idx+1));
        }
        return dispatch(0);
    }
    routes(){
        return async (ctx,next)=>{
            let {path,method} = ctx;
            // 过滤出路径相同的方法相同的
            let stack = this.stack.filter(layer=>layer.match(path,method));
            // 将这些方法组合起来 ，从上倒下执行
            this.compose(stack,ctx,next);
        }
    }
}

module.exports = Router;

