let express = require('./express');
let app = express();

// 路由的匹配 /user/1/2     /user/:id/:age 路径参数

app.get('/user/:id/:age',function(req,res){ // {id:1,age:2}
    res.end(JSON.stringify(req.params));
});
app.listen(3000);

// let pathToRegExp = require('path-to-regexp');

// let requestUrl = '/user/5/2'; // [5,2]
// let config = '/user/:id/:age' //  [id,age]
// // {id:5,age:2}
// let keys = [];  // [{name:id},{name:age}]
// let r = pathToRegExp(config,keys);
// let rs = requestUrl.match(r)
// let values = rs.slice(1); // [5,2,index]
// let result = keys.reduce((memo,current,index)=>(memo[current.name] = values[index],memo),{});
// console.log(result)



// let keys = []; 
// let regStr = config.replace(/:([^\/]+)/g,function(){
//     keys.push(arguments[1]); // id,age
//     return '([^\/]+)'
// });

// let r = requestUrl.match(new RegExp(regStr))
// let values = r.slice(1); // [5,2,index]

// let result = keys.reduce((memo,current,index)=>(memo[current] = values[index],memo),{});
// console.log(result)



// koa-router async +await实现koa路由