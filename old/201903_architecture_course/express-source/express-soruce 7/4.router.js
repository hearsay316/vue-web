let express = require('./lib/express');

// 继承
let router = express.Router(); // 创建了一个路由系统
let router1 = express.Router(); 
let app = express();
// 在这个路由系统上 可以绑定很多个层
router.get('/add',function(req,res,next){
    console.log('1');
    res.end('add');
});
router.get('/remove',function(req,res,next){
    console.log('2');
    res.end('remove');
})
// 如果匹配到了/user 会执行router 方法
router1.get('/child',function(req,res,next){
    res.end('child');
})
app.use('/user',router) // /user/add
app.use('/user',router1) ////user/add
app.listen(3000);