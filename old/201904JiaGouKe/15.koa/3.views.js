let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');
// let views = require('koa-views');
let router = new Router();
let fs = require('fs').promises;
function views(path,{map}){
    return async (ctx,next)=>{
        ctx.render =async function(filepath,obj){
            let ejs = require('ejs');
            let templateStr = await fs.readFile(path+'/'+filepath,'utf8');
            let r = ejs.render(templateStr,obj);
            ctx.set('Content-Type','text/html');
            ctx.body = r;
        }
        await next();
    }
}
app.use(views(__dirname+'/views',{
    map:{
        'html':'ejs'
    }
}));
router.get('/',async (ctx,next)=>{
    await ctx.render('index.html',{name:'zf'});
})
app.use(router.routes())
app.listen(3000);

// koa-generator
// koa xxxx -e