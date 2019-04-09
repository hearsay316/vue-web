// 装饰器 前端埋点 : 在ajax的请求中包装一层自己的逻辑
Function.prototype.before = function (callback) {
    let self = this;
     return function(){ // 这个的this 是指newFn()前端的this
         callback(); // before 的参数
         self.apply(self,arguments)
     }
};
function fn(val){
    console.log("一定的功能"+val)
}

let newFn = fn.before((function () {
     console.log("在函数执行前执行")
}));
newFn("你好");