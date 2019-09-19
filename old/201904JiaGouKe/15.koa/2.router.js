let Koa = require('koa');
let Router = require('koa-router');
let router = new Router();
let app = new Koa();

let user = require('./routes/user')
let work = require('./routes/work');
// 跟用户相关的 可能我放到一个user文件夹中 /user/add  /user/delete
// 功能相关的  work文件夹中  /work/add /work/delete


router.use('/user',user.routes()).use(user.allowedMethods())
router.use('/work',work.routes()).use(work.allowedMethods())
app.use(router.routes())
app.listen(3000);