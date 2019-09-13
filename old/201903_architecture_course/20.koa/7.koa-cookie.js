let Koa = require('koa');;
let Router = require('koa-router');
let session = require('koa-session');
let crypto = require('crypto');
// let r = crypto.createHmac('sha1','zfpx').update(`name=zfj`).digest('base64');
// console.log(r);
let app = new Koa();
app.keys = ['zfpx'];
let router =  new Router();
app.use(session({maxAge:30*1000},app));
router.get('/visit',(ctx)=>{
   if( ctx.session.visit){
    ctx.session.visit++;
   }else{
    ctx.session.visit = 1;
   }
   ctx.body = ctx.session.visit + 'current count'
})
router.get('/write',(ctx)=>{
    ctx.cookies.set('name','zfj',{signed:true});
    ctx.body = '写入成功'
})
router.get('/read',(ctx)=>{
    ctx.body = ctx.cookies.get('name')
})
app.use(router.routes())
app.listen(3000);

// express 精简版