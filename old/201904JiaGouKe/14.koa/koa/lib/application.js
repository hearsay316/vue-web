let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
let Stream  = require('stream');
let EventEmitter = require('events');
module.exports = class Application extends EventEmitter{
    constructor(){
        super();
        this.context = Object.create(context);// proto
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.middlewares = [];
    }
    use(fn){
        this.middlewares.push(fn);
    }
    createContext(req,res){
        let ctx = this.context;
        ctx.request = this.request;
        ctx.response = this.response;
        ctx.request.req = ctx.req = req;
        ctx.response.res = ctx.res = res;
        return ctx;
    }
    compose(ctx){// reduce 作业 reduce实现compose方法
        // 第一次middle  1
        let index = -1; // 表示一次都没有调用过
        let dispatch = (i) => { // reduce
            if(i <= index){ // 如果调用多次 index == i 
                return Promise.reject(new Error('next() called multiple times'))
            }
            let middle = this.middlewares[i];
            index = i;
            if(!middle) return Promise.resolve();
            return Promise.resolve(middle(ctx,()=>dispatch(i+1)));
        }
        return dispatch(0);
        // ----------------------------
        let next = async (index)=>{ // 默认返还的是一个promise
            let middle = this.middlewares[index++];
            // return 作用就是等待着所有组合后的promise执行完 在执行
            return middle(ctx,()=>next(index+1)); // 给前面传递一个匿名函数， await  next()
        }
        return next(0);
    }
    async handleRequest(req,res){ // 请求到来时会执行此函数
        let ctx = this.createContext(req,res);
        // 默认没有调用ctx.body
        res.statusCode = 404;
        try{
            await this.compose(ctx)
            // 这里执行了use传递的函数 内部会给ctx.body 属性赋值
        let _body = ctx.body;
        if(!_body){
           return res.end(`Not Found`);
        }
        if(_body instanceof Stream){
            // 设置一个下载头 filename指代的是下载文件名字
            res.setHeader("Content-Disposition","attachment;filename="+encodeURI('下载'));
            _body.pipe(res);
        }
        else if(typeof _body === 'object'){
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(_body)); // end 方法只能放字符串/ buffer
        }else{
            res.end(_body.toString());
        }
        }catch(e){
            // 如果出错了
            res.statusCode = 500;
            this.emit('error',e,ctx);
            res.end(`Internal Server Error`);
        }
    }
    // 调用listen 方法会创建一个服务
    listen(){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arguments);
    }
}

// 1) 写compose
// 2) 看一遍koa源码