// 客户端要静态文件 动态的数据
let Koa = require('koa');
let path = require('path');
let static = require('./koa-static');
let better = require('./koa-better-body');
let convert = require('koa-convert');// 将1.0的中间件进行转化
// koa-better-body generator
let app = new Koa();
// 处理静态服务  (所有的带异步的方法 都要处理后在执行 promise)
// 中间件应用： （顺序是从上而下执行）  中间件特点 一个函数返还一个async函数
    // 1）可以决定是是否向下执行
    // 2）权限校验 
    // 3) 扩展属性 或者方法
//真正封装中间件的时候 内部肯定返还的是一个函数，我们通过调用函数 来实现具体的功能
app.use(static(__dirname))
app.use(static(path.join(__dirname,'../')));
app.use(better({
    uploadDir:path.resolve(__dirname,'upload')
}));
app.use(async (ctx,next)=>{
    if(ctx.path === '/form' && ctx.method === 'POST'){
        // let obj = await bodyPaser(ctx.req); ctx.request.body
        ctx.body = ctx.request.fields
    }
})

// content-type:multipart/form-data; boundary=----WebKitFormBoundaryEohd6i8LAMfIOugw

app.listen(3000);