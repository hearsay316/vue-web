let express = require('./express');
let app = express();




// koa 中间件 和 express中间件区别? 异步处理上 promises
// app.use(function(req,res,next){
//     console.log(1);
//     next();
//     console.log(2);
// })
// app.use(function(req,res,next){
//     console.log(3);
//     next();
//     console.log(4);
// })
// app.param('id',function(req,res,next,value,key){
//     console.log('id 1');
//     next();
// });
// app.param('id',function(req,res,next,value,key){
//     console.log('id 2');
//     next();
// });
// app.param('age',function(req,res,next,value,key){
//     console.log('age 3');
//     next();
// });
// app.param('age',function(req,res,next,value,key){
//     console.log('age 4')
//     next();
// });
// app.get('/user/:id/:age',function(req,res){ // {id:1,age:2}
//     console.log(req.id);
//     res.end(JSON.stringify(req.params));
// });
app.listen(3000);