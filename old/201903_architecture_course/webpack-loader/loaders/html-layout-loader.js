let loaderUtils = require('loader-utils');
let fs = require('fs');
function loader(source){ // loader中不要带绝对路径 可能有想不到后果
    let cb = this.async();
    let {layout,reg} = loaderUtils.getOptions(this);
    this.addDependency(layout); // 如果自己在loader中引入的文件，如果变化希望重新打包 需要添加到依赖中
    fs.readFile(layout,'utf8',function(err,data){
        let r = data.replace(reg,source)
        cb(err,`module.exports=${JSON.stringify(r)}`);
    });
}
module.exports = loader;
// 我上线的时候 希望替换一下 所有 以 /s路径的链接都变成/d

// file-loader (主要就是拷贝文件) url-loader(主要是转化base64)