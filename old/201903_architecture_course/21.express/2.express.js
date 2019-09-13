// 基于回调的  express 4 -> koa
let express = require('./express');
let app = express(); // 返回的是一个监听函数

// 只要路径是以 / 开头的就能匹配到
app.use((req,res,next)=>{
    console.log(req.path,7)
    setTimeout(()=>{
        next('出错了');
    },2000)
})
app.use((req,res,next)=>{
    console.log(2);
    next();
    console.log(5);
})
app.use( (req,res,next)=>{
    console.log(3);
    next();
    console.log(6);
})
app.use((err,req,res,next)=>{
    console.log(err); // 错误处理中间件 参数必须有4个
    next(err);
})
app.use((err,req,res,next)=>{
    console.log(err); // 错误处理中间件 参数必须有4个
    res.json({a:1})
})
app.listen(3000);


