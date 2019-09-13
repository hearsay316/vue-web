let str = require('./b');
console.log(str); // 先查找当前文件下的文件存不存在 不存在添加.js .json 后缀 找到后就结束

// 找不到后会找对应的文件夹 默认找索引文件,如果有package.json 有这个文件 会查找main对应的入口文件，去进行加载
// 按照包的方法查找 多个文件组成一个包 npm init -y

// 除了文件的查找方式 第三方模块的查找方式
let r = require('xxx'); // xxx表示的是第三方文件夹的名字 找到名字后 会找package.json ，如果找不到向上找 ，找不到就报错
console.log(module.paths,r); 

// events