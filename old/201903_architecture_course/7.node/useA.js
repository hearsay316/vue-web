let fs = require('fs');
let path = require('path');
let vm = require('vm');
function Module(id){
    this.id = id; // 文件名
    this.exports = {}; // exports导出对象
}
Module._resolveFilename = function(filename){
    // 应该去依次查找 Object.keys(Module._extentions)
    // 默认先获取文件的名字
    filename = path.resolve(__dirname,filename)
    // 获取文件的扩展名
    let flag  = path.extname(filename);
    // 看扩展名有没有 没有的话就是js
    let extname = flag ? flag:'.js';
    // 如果已经有扩展名了 就采用原来的名字 没有的话增加扩展名
    return flag ? filename : (filename + extname);
}
Module._extensions = Object.create(null);
Module.wrapper = [ // exports
    '(function(module,exports,require,__dirname,__filename){','})'
]
Module._extensions['.js'] = function(module){ // id exports 
    // module.exports = 'hello'
    let content = fs.readFileSync(module.id,'utf8');
    let strTemplate = Module.wrapper[0] + content + Module.wrapper[1];
    // 希望让这个函数执行 并且 我希望把exports传入进去
    let fn = vm.runInThisContext(strTemplate);
    // 模块中的this就是module.exports的对象
    fn.call(module.exports,module,module.exports,r)
}
// json 就是直接将结果放到 module.exports 上
Module._extensions['.json'] = function(module){
    let content = fs.readFileSync(module.id,'utf8');
    module.exports = JSON.parse(content);
}
Module._cache = {}; // 缓存对象 
Module.prototype.load = function(){
    // 获取文件的扩展名
    let extname = path.extname(this.id);
    Module._extensions[extname](this);
}
function r(filename){
    let absPath = Module._resolveFilename(filename);
    if(Module._cache[absPath]){ // 如果缓存过了 直接将exports对象返回即可
        return Module._cache[absPath].exports; 
    }
    let module = new Module(absPath);
    Module._cache[absPath] = module; // 增加缓存模块
    module.load(); // module.exports = 'hello'
    return module.exports; // 用户会将结果赋予给exports对象上 默认require方法会放回 module.exports 对象
}
let str = r('./a.json'); // .js .json .node;
console.log(str);


// require的执行过程
// 1) 加载时 先看一下模块是否被缓存过 第一次没有缓存
// 2) Module._resolveFilename 解析出当前引用文件的绝对路径
// 3) 创建一个模块 模块有两个属性 一个叫 id = 文件名,exports = {}
// 4) 将模块放到缓存中
// 5) 加载这个文件 Module.prototype.load
// 6) 拿到文件的扩展名 ,根据扩展名 调用对应的方法
// 7) 会读取文件  差一个加一个自执行函数 将代码放入