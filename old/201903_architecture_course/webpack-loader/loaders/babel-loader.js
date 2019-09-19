// 为了实现loader，提供一些 工具的方法
let loaderUtils = require('loader-utils');
let babel = require('@babel/core');
function loader(source){
    // 怎么调试webpack源码  你也写一个文件 require('webpack')
    // node + 文件名执行 需要能调试
    // this是webpack内部帮你传递的属性
    let cb = this.async(); // 调用此方法后loader 会变成一个一步的loader
    // 默认loader是同步状态 可以自动把loader的返回值直接返回 callback(source),
    // 如果是异步 需要自己手动调用cb 将转化后的结果放进去 callback第一个参数是err
    // babel-loader / core.transform -> @preset-env
    let options = loaderUtils.getOptions(this);
    babel.transform(source,{
        ...options,
        sourceMap:true,
        filename:this.resourcePath.split('/').pop()
    },function(err,r){
        cb(err,r.code,r.map); // 这里需要处理一下source-map
    });
    // loader的执行上下文
    // return source
}
module.exports = loader