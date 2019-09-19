// 引入koa koa主要就是帮我们封装了http服务
// 1） 中间件 2） 错误处理机制
// ctx context 上下文 原生的（req,res） koa自己封装的两个对象(request,response)
let Koa = require('koa');

let app = new Koa();

app.use((ctx)=>{ // handleRequest
    console.log(ctx.req.url);
    console.log(ctx.request.req.url); // 为什么要把req 放在ctx.request目的是可以在request对象中拿到req
    // ----------
    console.log(ctx.request.path); // 包装后的request对象
    console.log(ctx.path); // ctx.path => ctx.request.path

    ctx.response.body = 'xxx';
    console.log(ctx.body);
});

app.listen(3000); 
app.listen(4000);