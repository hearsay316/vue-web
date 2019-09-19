// fs,path,vm 这些模块 都是node中的核心模块

let fs = require('fs');
let path = require('path');
// 如果有/的情况 就用join  resolve解析出来是绝对路径 
console.log(path.resolve(__dirname,'./name.txt','a'));
console.log(path.join(__dirname,'./name.txt','/','../'));
console.log(path.extname('1.min.js'));
console.log(path.basename('1.js','.js'));
console.log(path.dirname(__dirname)); // 取父路径 

// 读文件时最好采用绝对路径 
let r = fs.readFileSync(path.resolve(__dirname,'./name.txt'),'utf8');
// 判断文件是否存在,不存在就报错
fs.accessSync('./name.txt'); // fs.exists 这个方法废弃掉了


// vm 沙箱 干净的环境
let a = 'hello';
let str = `console.log(a)`
eval(str);

// 让字符串执行的方法？
// let strFn = new Function(str);
// strFn();

// vue模板引擎的实现原理 new Function + with

let vm = require('vm');
vm.runInThisContext(str); //这个方法可以创造一个干净的执行上下环境 不会向上查找
