let express = require('./lib/express');
let app = express();
let path = require('path');
// 设置引用的文件的文件夹路径
app.set('views',path.resolve(__dirname,'view'));
// console.log(app.get('views'))
app.set('view engine','html'); // 设置默认的后缀名
// 设置后缀名 后缀名是html的用 .__express 来渲染
app.engine('html',require('ejs').__express);  // set 和 engine 主要是用来保存数据的

app.get('/user/add',function(req,res,next){
    console.log(req.path,req.query)
    res.render('hello',{name:'zf'},function(err,html){
        res.end(html);
    });
});

app.listen(3000);