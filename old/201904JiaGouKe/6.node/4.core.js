// fs模块 fileSystem ...  同步 异步的
// require('./b');
let fs = require('fs');
let path = require('path'); // 操作路径

fs.accessSync('./template.html'); // 判断文件是否存在

// path 主要就是操作路径 resolve join dirname extname basename
// __dirname, __filename
console.log(__dirname); // 绝对路径
console.log(__filename);
console.log(path.resolve(__dirname,'a','a.js')); // 会解析出绝对路径
console.log(path.join('a','a.js','/','../')); // 如果路径有 / 开头不要用resolve
fs.accessSync(path.resolve(__dirname,'a.js'));

console.log(path.dirname(__dirname)); // 取父路径
console.log(path.extname('a.min.js'));
console.log(path.basename('a.js','s'));
// 读写文件的操作 一律使用绝对路径


// vm 虚拟机模块
let vm = require('vm');
// 让一个字符串执行的方式  eval newFunction
let a = 10;;
vm.runInThisContext('console.log(a)'); // node 的模块使用的是这种方法

// ....