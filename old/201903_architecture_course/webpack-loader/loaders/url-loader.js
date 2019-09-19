let loaderUtils = require('loader-utils');
let mime = require('mime');
function loader(source){ // minicss-exract-plugin
   let {limit} = loaderUtils.getOptions(this);
   if(limit>source.length){
        return  `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`; // base64的转化
   }else{
       return require('./file-loader')
   }
}
loader.raw = true; // 这样写标示source是一个二进制
module.exports = loader;

// file-loader  url-loader

// css-loader (1.处理图片路径的问题 2.处理引用的其它css文件) less-loader style-loader 

// webpack视频 css-loader的实现

// `
// @import './a.css'  require('./a.css')
// body{
//     background:url(`+require('./1.png')+`)
// }
// `