// koa 里面并不支持session  {}
// 需要自己去实现 koa-session 每次重启session 都会丢失
// 你需要把session 存储到数据库中
let Koa = require('koa');
let Router = require('koa-router');
let app = new Koa();
let router = new Router();
let session = require('koa-session');
app.keys = ['zf']
app.use(session({
    httpOnly:true
},app))
router.get('/visit',async ctx=>{
    // 如果用户第一访问我 我需要给他一个默认的访问数量
    // ctx.session.visit = 1; // 店名  卡号
    let visit = ctx.session.visit;
    if(visit){
        ctx.session.visit += 1;
    }else{
        ctx.session.visit = 1;
    }
    ctx.body = '第'+ctx.session.visit+'次访问'
});
app.use(router.routes());
app.listen(3000);
// session 特点
// 服务端渲染 页面是有 服务端提供的
// koa + ejs 来实现一个登陆功能
// 如果登陆才能访问 详情页 如果没登录跳回首页 
// nuxt next 前后端同构 在前端中获取服务端cookie
