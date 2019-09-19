// 有的人会将链接数据库方法放到global为了方便
let r = require('./a');  // global.a = 100;

console.log(r);
// 核心模块 fs path vm
// 文件模块 通过路径来引用
// 第三方模块

// v11.10.4为主
// 模块的查找的特性
// store.js  store / index.js
// 如果文件夹和文件相同名字 

// 先找 如果是相对路径或者绝对路径，先查找文件，如果找不到会尝试添加后缀名查找,在找不到找文件夹
// 在以前版本中 会先找包,找不到包在找文件 ，文件找不到在找文件夹

// 找文件夹的时候会先找 package.json main 如果找不到就找index.js index.json


// npm install 安装的模块 
let r = require('xxx');  
console.log(r);
console.log(module.paths);// 第三方的查找范围 如果找不到就报错 ，只会查找node_modules文件夹

// 两个人的区别
// 不同 查找范围
// 数组的扁平化... 总结一下模块化的规范 （调试）
// 只有2之前 发一套作业 提交到git 发完作业 你先写写完，下周六 
// 完成作业时间一周

// new bind原理

// fs buffer 编码 流 http