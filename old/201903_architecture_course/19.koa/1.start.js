let Koa = require('./koa/lib/application');
let app = new Koa();
// vue Object.defineProperty (不能分开定义get和set) __defineGetter__
app.use((ctx)=>{ // 把req和res整合到了ctx上  又会扩展一些方法和属性 放到ctx对象上
    // ctx 上 有两对 属性  req,res (node中原声的)   /  request,response (自己封装的属性)
    console.log(ctx.req.method);
    console.log(ctx.request.req.method);
    // ----------
    console.log(ctx.request.method);
    // ctx.request ctx.response
    // ctx = ctx.request
    // ctx =ctx.response
    ctx.response.body = 'hello'
    console.log(ctx.body);
})
app.listen(3000);