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
let path = require('path');
let fs = require('fs');
let vm = require('vm');
// .commonjs规范规定会先查找.js 文件 找不到查找.json
function Module(id){
    this.id = id;
    this.exports = {};
}
Module.wrapper = [
    "(function(exports,module,req,__firname,__dirname){",
    "})"
]
Module._extensions = {
    '.js'(module){ // 如何处理模块
        let fileContent = fs.readFileSync(module.id);
        // 给读取出来的文件内容 添加自执行函数
        let script = Module.wrapper[0] + fileContent + Module.wrapper[1];
        let fn = vm.runInThisContext(script);
        // exports = 'hello'
        fn.call(module.exports,module.exports,module,req)
    },
    '.json'(module){
        // 在json中只需要将 结果赋予给exports 对象上即可
        let fileContent = fs.readFileSync(module.id);
        module.exports = JSON.parse(fileContent)
    }
}
// 解析文件的绝对路径 可以尝试添加后缀
Module.resolveFilename = function(filePath){
    let absPath = path.resolve(__dirname,filePath);
    // 如果文件名没后缀 我需要依次添加后缀 如果没有 就报错了
    let ext = path.extname(absPath); // 去查找当前有没有后缀
    let finalPath = absPath;
    if(!ext){
        let exts = Object.keys(Module._extensions); // [.js,.json]
        for(let i = 0; i< exts.length;i++){
            finalPath  = absPath+exts[i]; // xxx
            try{
                fs.accessSync(finalPath);
                break;
            }catch(e){
                finalPath = path.basename(finalPath,exts[i]);
            }
        }
        if(!path.extname(finalPath)){
            // 如果循环后文件还是没有后缀
            throw new Error('文件不存在');
        }
    }else{
        try{
            fs.accessSync(finalPath);
        }catch(e){
            throw new Error('文件不存在');
        }
    }
    return finalPath
}
Module.prototype.load = function(){ // 是真正加载模块的方法
    //this指代的就是当前的模块
    let extension = path.extname(this.id);
    Module._extensions[extension](this); // module.exports = 'hello';
    return this.exports; // 返回的是module.exports 改变exports属性不会受到影响
}
Module._cache = {};
Module.load = function(filePath){ // ./a
    let absPath = this.resolveFilename(filePath);
    // 如果加载这个文件有这个模块，直接把这个模块的module.exoports;
    if(Module._cache[absPath]) return Module._cache[absPath].exports;
    let module = new Module(absPath); // module.id module.exports;
    Module._cache[absPath] = module; // 把文件和模块对应上 
    return module.load();
}
function req(filePath){
    return Module.load(filePath)
}
let a = req('./a'); // commonjs 规范 导出的是一个具体的值，值是不会变的
setInterval(()=>{
    console.log(a)
},1000);


// module.exports = {}
// let exports = exports;
// exports = 1; // 错误写法