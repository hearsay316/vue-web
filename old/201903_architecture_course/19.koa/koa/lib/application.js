let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
let Stream = require('stream');
let EventEmitter = require('events');

class Application extends EventEmitter{
    constructor(){
        super();
        // 不会感染当前默认的对象
        this.ctx = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);

        this.middlewares = [];
    }
    use(fn){
        this.middlewares.push(fn);
    }
    createContext(req,res){
        let ctx = this.ctx;
        ctx.request = this.request; // 这两个属性是自己封装的
        ctx.response = this.response;
        ctx.req = ctx.request.req = req;// 自己封装的request上应该有req指向原声的req
        ctx.res = ctx.response.res = res;
        return ctx;
    }
    compose(ctx,middlewares){
        // 用的是new Promise的形式
        // reduce
        let idx = -1;
        let dispatch = async (index)=>{
            if(idx<= index)  throw new Error('multi')
            if(index >= middlewares.length) return Promise.resolve(); // 越界直接成功即可
            idx = index
            let middle = middlewares[index]; // 获取第一个use方法传入的参数
            return middle(ctx,()=>dispatch(index+1));
        }
        return dispatch(0); // 返回一个promise，保证可以链式调用 
    }
    handleRequest(){
        return (req,res)=>{
            let ctx = this.createContext(req,res); // 创建上下文
            // 把所有函数组装成一个promise ，等待这个这个promise执行成功后 ，将结果响应回去
            res.statusCode = 404;
            let p = this.compose(ctx,this.middlewares);
            p.then(()=>{
                if(!ctx.body) return res.end(`Not Found`);
                if(ctx.body instanceof Stream) {
                    res.setHeader('Content-type', 'application/octet-stream');
                    // 需要更新编码
                    res.setHeader('Content-Disposition', 'attachment;filename='+encodeURIComponent('下载'));
                    return ctx.body.pipe(res);
                }
                if(typeof ctx.body ==='object'){
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify(ctx.body))
                }
                res.end(ctx.body);
            }).catch(err=>{
                this.emit('error',err,ctx)
            })
        }
    }
    listen(){
        // 可以保证this不错乱
        let server = http.createServer(this.handleRequest());
        server.listen(...arguments);
    }
}

module.exports = Application;


// 用的是new Promise的形式
// reduce