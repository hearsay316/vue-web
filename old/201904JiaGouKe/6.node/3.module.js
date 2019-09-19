// es6 module (babel) 来转化模块
// mjs模块

// 模块的实现原理 每一个文件都加一个IIFE 命名空间不能杜绝 命名冲突问题
// commonjs 规范  AMD requirejs CMD seajs UMD 统一模块规范
// 1.定义每一个文件都是一个模块
// 2.每个模块要给别人用 都需要导出这个模块
// 3.如果别人需要引用 require

// module.exports = Promise  require('./Promise')

// 模块分类 1） 核心模块 内置模块 fs require('fs');
// 2) 第三方模块 ejs commander require('ejs')  需要安装
// 3） 文件模块 必须要有 ./ 绝对路径 自己写的
let r = require('./a1.js/index.js.js.js'); //webpack调试

// 1) 用 vscode自带的功能
// 2) node --inspect-brk 3.module.js

// 模块的运行 
// 1. 加载模块 Module._load(文件名)
// 2. 看一下当前这个模块有没有缓存过
// 3. Module._resolveFilename
// 4. 根据相对路径转化成一个绝对路径
// 5. 通过路径创建一个模块 1） 文件名 id  2) exports对象
// 6. 将模块放到缓存中
// 7 .加载模块 根据后缀名调用对应的方法
// 8. 读取文件
// 9. 添加闭包
// 10.运行在沙箱环境中

console.log(arguments);