// 如何实现 多层路由
let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
// 配置多路由
let router = new Router(); // 根路由  用户路由  列表路由
let userRouter = new Router();
// 二级路由  prefix
userRouter.get('/add',(ctx)=>{
    ctx.body = 'hello'
})
let listRouter = new Router();
listRouter.get('/add',(ctx)=>{
    ctx.body = 'world'
})
// 注册子路由
router.use('/user',userRouter.routes())
router.use('/list',listRouter.routes())

app.use(router.routes());
app.listen(3000);

// koa里的脚手架