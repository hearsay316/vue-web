let express = require('express');
let app = express();
let path = require('path');

// 模板引擎 koa ctx.render
// smarty
// app.static = function(__dirname){
//     return function(req,res,next){
//         // todo ... ;
//     }
// }
app.use(express.static(__dirname));
app.engine('.html',require('ejs').__express); // 使用什么来渲染 
app.set('view engine','.html');// 默认添加.html后缀
app.set('views',path.join(__dirname,'views1')); // 设置模板的查找范围

app.get('////',function(req,res,next){ // jade ejs  handlerbar underscore
    // let html = res.render('1',{username:'zfpx'})
    // res.end(html);
    // res.send({name:'zf'});
    res.sendFile(path.join(__dirname,'package.json'));
    // res.render('1',{username:'zfpx'},(err,html)=>{
    //     console.log(res.end);
    //     res.end(html)
    // })
    console.log(req.query);
});
app.listen(3000);

// express  路由
// app.get('/',fn,fn,fn);  路由的中间件 单个的
// app.use() 普通中间件 参数是3个
// app.use() 错误中间件  参数是4个 next传递参数就会执行这个方法
// 路由 路径参数 req.params 正则匹配
// req.param 处理某个属性的

// 里面内置了一个中间件 可以处理模板引擎 封装了req和res方法
// 有一个内置中间件 静态文件处理中间件

// koa              expess
// koa-bodyparser   body-parser
// koa-static       express.static
// koa-views        express自带
// koa-router       express 自带
// koa中的cookie     cookie-parser 
// koa-session      express-session
// koa-multer2      multer