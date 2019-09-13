// node中模块
// 模块特点 防止变量污染  在以前的开发中 不用模块化 无法处理依赖关系
// 代码不好维护 最早的时候使用 单例的方式解决 不能保证变量 唯一性
// 单例可能会导致调用时复杂 命名过长
// IFFE 立即执行函数 

// seajs cmd requirejs amd  
// umd 统一模块化   es6module  (commonjs 规范)
// import export mjs => ts模块化 babel-node 转化es6的模块


// commonjs 规范
// 每个js文件都是一个模块
// 每个文件如果需要用到别的模块  require()
// 想把代码给别人使用 需要导出模块 module.exports
let obj = (function(){
    var a = 1;
    var b = 2;
    return {a,b}
})()



// fs path evemts util Buffer
// commonjs 规范

// 树的遍历 遍历树  递归
