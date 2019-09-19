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
article.get('/add',function(req,res,next){
    res.end('a /add');
})
article.get('/remove',function(req,res,next){
    res.end('a /remove');
})
app.use('/user',user); 
app.use('/article',article); 
app.listen(3000);
