let Koa = require('./koa/lib/application');
let fs= require('fs');
let logger = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('logger');
            resolve();
        },1000)
    })
}
let app = new Koa();
// 只要写next 前面必须加上 await
// compose 
app.use(async (ctx,next)=>{ // 洋葱模型可以用来统计时间  // 1
    console.log(1); // 1 3 2
    await next();  
    await next();  
    console.log(2);
});
app.use(async (ctx,next)=>{   // 2
    console.log(3);
    await logger();
    next(); // await ()=>3
    console.log(4);
});
app.use(async (ctx,next)=>{ // 3
    console.log(5);
    //next();
    ctx.body = 404;
    console.log(6);
});
app.listen(3000); 
app.on('error',function(err,ctx){
    console.log(err,'err');
    ctx.res.end('xxxx'); // 错误中需要调用原生ctx 才能更新显示内容
});