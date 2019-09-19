let express = require('./express');
// express 内置了路由系统 中间件
let app = express();
app.get('/',function(req,res,next){
    console.log(1);
    next();
},function(req,res,next){
    console.log(11);
    next();
},function(req,res,next){
    console.log(111);
    next();
});
app.get('/',function(req,res,next){
    console.log('3');
    res.end('hello');
})
app.post('/',function(req,res,){
    res.end('post')
})
app.listen(3000);