let express = require('./lib/express');

let app = express();

app.get('/',function(req,res,next){
    console.log('start 1');
    next(); // 继续执行下一个 
},function(req,res,next){
    console.log('start 11');
    next(); // 继续执行下一个 
},function(req,res,next){
    console.log('start 111');
    next(); // 继续执行下一个 
},function(req,res,next){
    console.log('start 1111');
    next(); // 继续执行下一个 
});

app.get('/',function(req,res,next){
    console.log('start 2');
    res.end('end');
});
app.listen(3000);