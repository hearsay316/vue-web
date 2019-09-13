let express = require('./lib/express');

let app = express();
let path = require('path');
// 设置引用的文件的文件夹路径
app.set('views',path.resolve(__dirname,'view'));
// console.log(app.get('views'))
app.set('view engine','html'); // 设置默认的后缀名
// 设置后缀名 后缀名是html的用 .__express 来渲染
app.engine('html',require('ejs').__express);  // set 和 engine 主要是用来保存数据的

app.use(function(req,res,next){ // render就是自己封装的一个渲染函数
    res.render = function(templateName,options,callback){
        let {view,engine,ext} = app.engines // 渲染的属性
        let filename = templateName+'.'+engine; // hello.html
        let absPath = path.join(view,filename);
        // 当前这个模板用来渲染的方法
        let renderFn = ext[path.extname(filename)]
        renderFn(absPath,options,function(err,html){ // ejs.renderFile 
            if(callback){
                return callback(err,html);
            }
            res.end(html);
        });
    }
    next();
});
app.get('/',function(req,res,next){
    res.render('hello',{name:'zf'},function(err,html){
        res.end(html);
    });
});

app.listen(3000);