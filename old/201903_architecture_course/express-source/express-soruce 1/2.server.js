let express = require('express');

let app = express();

app.get('/',function(req,res,next){
    console.log('start 1');
    next(); // 继续执行下一个 
});

app.get('/',function(req,res,next){
    console.log('start 2');
    res.end('end');
});
app.listen(3000);