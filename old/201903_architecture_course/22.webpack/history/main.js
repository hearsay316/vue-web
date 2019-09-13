 (function(modules) { 
 	var installedModules = {};
 	function __webpack_require__(moduleId) {
 		if(installedModules[moduleId]) { // 缓存 如果有缓存直接把exports属性返回即可
 			return installedModules[moduleId].exports;
 		}
 		var module = installedModules[moduleId] = { // 创建模块
 			i: moduleId,
 			l: false,
 			exports: {}
     };
     // 让对应的函数执行，函数会给module.exports 赋予结果
 		modules[moduleId].call(mduole.exports, module, module.exports, __webpack_require__);
     module.l = true;
     // 把module.exports返回
 		return module.exports;
 	}
 	return __webpack_require__("./src/index.js"); // 默认加载主模块
 })
 ({
  "./src/a.js":
  (function(module, exports) {
  eval("module.exports = 'hello';\n\n//# sourceURL=webpack:///./src/a.js?");
  }),
  "./src/index.js":
  (function(module, exports, __webpack_require__) {
  eval("let str = __webpack_require__(/*! ./a */ \"./src/a.js\")\nconsole.log(str);\n\n//# sourceURL=webpack:///./src/index.js?");
  })
});
// ast 语法树 进行了代码的转化