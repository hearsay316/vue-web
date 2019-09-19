// 判断类型的方式
// typeof instanceof (__proto__) constructor Object.prototype.toString.call
function isType(type){ // 函数柯里化(可以组合) -> 偏函数  
    return function(obj){
        return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
}
// 批量生产方法 Number Boolean
let objs = {}; // objs.isString = fn
['Number','Boolean','String','Null'].forEach(type => {
    objs['is'+type] = isType(type)
});
let obj = 'abc'
console.log(objs.isString(obj));
console.log(objs.isNumber(123));

// 前端荣耀 小程序 打卡小程序