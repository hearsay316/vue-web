// 基于回调的  express 4 -> koa
let express = require('./express');
let app = express(); // 返回的是一个监听函数
// 内置了路由

// /a/1/2   => params {name:1,age:2}
app.get('/a/:name/:age',function(req,res){ // 路径参数 调用这个路径的时候 可以传递参数
    console.log(req.params,'xxx');
    res.end('xxx')
});
app.get('/1',function(req,res){
    res.end('hello');
});
app.post('/1',function(req,res){
    res.end('post hello');
});
app.all('*',function(req,res){ // 只能放在页面的最后面
    res.end('all *')
});
app.listen(3000);





// let url = '/a/1/2';
// let str = '/a/:name/:age';  // {name:1,age:2}
// // let pathToRegExp = require('path-to-regexp');

// let r =  str.replace(/:([^\/]+)/g,function(){
//     return "([^\/]+)"
// });
// console.log(new RegExp(r));

// let keys = [];
// // let r = pathToRegExp(str,keys);
// // /^\/a\/([^\/]+?)\/([^\/]+?)(?:\/)?$/i
// let args = keys.map(key=>key.name);
// let [,...rs] = url.match(r);
// console.log(rs)