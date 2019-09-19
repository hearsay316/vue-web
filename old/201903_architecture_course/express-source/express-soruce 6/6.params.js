let express = require('./lib/express');
let app = express();
// param 方法都是在路由之前放置  发布订阅模式  把所有的函数用next链接起来
// node events {id:[fn,fn],name:[fn]}
app.param('id',function(req,res,next,value,key){ // 不是一个层，只是把关系做一个映射，执行路由的时候 把当前对应的订阅的事件 触发一下
    console.log(value);
    next();   // next函数就是execCallback 这个函数
});
app.param('id',function(req,res,next,value,key){
    console.log(value);
    next();
});
app.param('name1',function(req,res,next,value,key){
    console.log(value);
    next();
});
// 把收集到的路由参数 ，去订阅对象中查找，依次发布
app.get('/user/:id/:name',(req,res)=>{
    res.end(JSON.stringify(req.params))
});
app.get('/login/:id/:name',(req,res)=>{
    res.end(JSON.stringify(req.params))
});
app.listen(3000);
