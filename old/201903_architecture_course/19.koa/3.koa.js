let Koa = require('./koa/lib/application')


let app = new Koa();


app.use((ctx,next)=>{
    next(); // 不允许多次调用next方法
    next();
    return next(); // ()=>dispatch(index+1)
})
p.then(()=>{
    ctx.body
})
app.listen(3000);