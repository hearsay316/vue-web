let path = require('path');
let init = function(){ // app
    let self = this;
    let middle = (req,res,next) =>{
        res.render = function(templateName,options,callback){
            let {view,engine,ext} = self.engines // 渲染的属性
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
    }
    return middle
}
module.exports = init;