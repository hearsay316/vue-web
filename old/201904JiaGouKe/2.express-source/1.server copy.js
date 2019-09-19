let express = require('./express');
// express 内置了路由系统 中间件
let app = express();
// 中间件的特点
// 1) 可以决定是否向下执行 next
// 2) 可以扩展属性和方法，内部的expres 有所谓的内置中间件
// 3) 匹配的规则 默认是都匹配 如果有路径匹配到开头即可
// cookie path /
// 中间件特点 完全相等 或者不传 /

// 中间件 如果希望走到错误里 可能需要手动传递错误
app.use('/a',function(req,res,next){ // 中间件的next方法是外层的next
    console.log(1);
    next();
});

app.get('/',function(req,res,next){ // 路由中的next指代的是内层中的next
    next();
})
app.use(function(req,res,next){
    console.log(2);
    next();
});
// 错误处理中间件唯一不同的是处理函数有4个参数

// app.use(function(req,res,next){
//     res.end('err');
// });
app.use(function(err,req,res,next){ // 判断参数的个数 就是通过函数length
    console.log('err1',1);
    next();
});
app.use(function(req,res){
    res.end('end');
})
app.listen(3000);