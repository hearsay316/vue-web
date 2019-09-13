let express = require('./lib/express');

let app = express();
// 路径匹配原则 1) 不写就是/ 2)路径相等可以匹配  3)/user/add /user
app.use('/',function(req,res,next){
    console.log(1);
    next();
});

app.use('/2',function(req,res,next){
    console.log(2);
    res.end('hello');
})
app.use(function(req,res,next){
    console.log(2);
    res.end('world');
})
app.listen(3000);