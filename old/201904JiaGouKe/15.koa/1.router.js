let Koa = require('koa');
let Router = require('./koa-router');
let app = new Koa();
let router = new Router();
// /form 需要返回一个表单   get
// 不同的路径返回不同的内容 如果匹配不到就不执行，会自动继续向下匹配

// koa 第三方模块 和 express 大 全
router.get('/form', (ctx,next)=>{
    ctx.body = 'form1';
    console.log('1')
    //next();
});
router.get('/form',(ctx,next)=>{
    ctx.body = 'form2'
    //next();
});
router.get('/hello',(ctx,next)=>{
    ctx.body = 'hello';
    //next();
});
app.use(router.routes()); // 机遇koa的中间件原理
app.use((ctx)=>{
    console.log('123');
})
app.listen(3000);