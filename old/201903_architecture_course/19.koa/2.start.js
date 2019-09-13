let Koa = require('koa');
let app = new Koa();
let logger = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('logger');
            resolve();
        }, 2000);
    })
}
let fs = require('fs');
app.use(async (ctx,next)=>{
    throw new Error('出错了')
    ctx.body = {a:1}
})
app.on('error',function(err,ctx){
    ctx.res.end('123');
});

// 核心promise 

// app.use(async (ctx,next)=>{ 
//     console.log(1);
//     ctx.body = 'hello'
//     return next(); // await 后面根一个promise 会等待这个promise执行成功后才完成
//     console.log(2);
// });
// app.use(async (ctx,next)=>{ 
//     console.log(3);
//     await logger();
//     ctx.body = 'world'
//     await next();
//     console.log(4);
// })
// app.use(async(ctx,next)=>{ 
//     console.log(5);
//     await logger();
//     ctx.body = 'xxx'
//     await next();
//     console.log(6);
// })
app.listen(3000);