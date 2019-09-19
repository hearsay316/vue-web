let express = require('./lib/express');
let app = express();
// 路径匹配原则 1) 不写就是/ 2)路径相等可以匹配  3)/user/add /user
app.use('/',function(req,res,next){
    console.log(1);
    req.a = 1;
    next('error'); // 可能会传入错误
});
app.use('/2',function(req,res,next){
    console.log(2);
    res.end('hello');
})
app.use(function(req,res,next){
    console.log(2);
    res.end('world');
});
app.get('/',function(req,res,next){
    next('错误')
})
app.use((err,req,res,next)=>{
    res.end(err);
})

app.listen(3000);