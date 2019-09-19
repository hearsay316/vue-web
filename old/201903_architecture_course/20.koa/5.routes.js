// 如何实现 多层路由
let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
let router = new Router({
    prefix:'/user'
});
// 二级路由  prefix
router.get('/add',(ctx)=>{
    ctx.body = 'hello'
})
router.get('/delete',(ctx)=>{
    ctx.body = 'hello'
})
app.use(router.routes());
app.use(router.allowedMethods()); // 一般情况下会增加这一句 405
app.listen(3000);