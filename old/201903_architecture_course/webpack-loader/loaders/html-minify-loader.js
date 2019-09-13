let Minimize = require('minimize');
// 1) 需要获取用户的参数
let loaderUtils = require('loader-utils');
// 2) 校验用户的参数是否正确
let validateOptions = require('schema-utils')
function loader(source){ // loader主要的功能就是转化
    let options = loaderUtils.getOptions(this);
    // 我要先创建一个结构的骨架
    let schema = {
        "type": "object",
        "properties": {
          "comments": {
            "type": "boolean"
          }
        }
    }
    validateOptions(schema,options,'html-minify-loader')
    // html-webpack-plugin
    let minimize = new Minimize(options)
    let r = minimize.parse(source);
    return `module.exports=${JSON.stringify(r)}`;  
}
module.exports = loader;



// let str = require('./index.html')

// 多页面实现

// 登陆页  首页