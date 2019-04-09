// 装饰器
Function.prototype.before = function (callback) {
    let self = this;
     return function(){
         callback(); // before 的参数
         self.apply(self,arguments)
     }
};
function fn(){
    console.log("一定的功能")
}

let newFn = fn.before((function () {
     console.log("在函数执行前执行")
}));
newFn();