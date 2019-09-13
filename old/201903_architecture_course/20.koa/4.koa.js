let Koa = require('koa');
let app = new Koa();
let Router = require('./koa-router');
// user  /user/add  /user/delete
// list /list/add /list/delete
// 路由 就是根据不同的路径和方法 返回不同的结果 koa-router
let router = new Router();
router.get('/',async (ctx,next)=>{
    ctx.body = 'hello'
    await next();
});
router.get('/', async(ctx,next)=>{
    ctx.body = 'user'
    await next();
});
router.get('/user',async (ctx,next)=>{
    ctx.body = 'user123'
});
// 路由的装载
app.use(router.routes());
app.use((ctx,next)=>{
    ctx.body = 'hello world'
})
app.listen(3000);

