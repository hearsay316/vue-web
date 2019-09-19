let Koa = require("koa");
let fs = require('fs').promises;
// let staitc = require('koa-static');
let app = new Koa();
let path = require('path');
function static(dirname){
    return async(ctx,next)=>{
        try{
            let absPath = path.join(dirname,ctx.path);
            let statObj = await fs.stat(absPath);
            if(statObj.isDirectory()){
                absPath = path.join(absPath,'index.html');
                await fs.access(absPath)
            }
            ctx.set('Content-Type','application/javascript;charset=utf8')
            ctx.body = require('fs').createReadStream(absPath);
            return 
        }catch(e){
            return next();
        }
    }
}
app.use(static(path.join(__dirname,'koa')));
app.use(static(path.join(__dirname)));

app.use(async (ctx, next) => {
});
app.listen(3000);

// koa-router 二级路由
// koa-views
// npm install koa-generator -g
// cookie-session 
// 写一版简单的express 
// 下周日 源码版的express

// mongo redis 
// webpack

// koa express egg‘’


// vue + koa /  react + koa  小程序 + koa flutter+koa

// react ts  ts+react

