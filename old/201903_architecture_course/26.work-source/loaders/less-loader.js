let less = require('less');
function loader(source){ // 把内容转化成css
    let css;
    less.render(source,function(err,r){
        css = r.css;
    });
    // 最终的loader 应该返还一个js可以执行的脚本
    return css;
}
module.exports = loader