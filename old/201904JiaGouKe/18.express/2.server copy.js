let express = require('./express');
let app = express();

// app.get('/',function(req,res,next){
//     res.end('hello');
// })
let user = express.Router();
let article = express.Router();
user.get('/add',function(req,res,next){
    next();
},function(req,res,next){
    res.end('/add');
})
user.get('/remove',function(req,res,next){
    res.end('/remove');
})
article.get('/add1',function(req,res,next){
    res.end('a1 /add');
})
article.get('/remove',function(req,res,next){
    res.end('a1 /remove');
})
// /user/add1
app.use('/user',user);  
app.use('/user',article); 
app.listen(3000);

// koa-router async +await实现koa路由