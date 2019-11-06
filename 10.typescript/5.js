"use strict";
var x = "hello";
console.log(x.toLocaleLowerCase());
// 基本类型没有方法
//  他是有一个自动化装箱的过程
//  他内部是一个包装
console.log(new String(x).charAt(0));
var znamezhufeng;
//console.log((znamezhufeng as string).toLocaleLowerCase());
var named = 1;
/**
 * 1 函数定义
 * */
function hello(x) {
    return "hello" + x;
}
var getUserName = function (first, lastname) {
};
// 可选参数
function print(name, age) {
    return "sss";
}
print("xasds");
// 默认参数
function print2(name, age) {
    if (age === void 0) { age = 555; }
    return "sss";
}
print2("xsd");
function sum() {
    var umbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        umbers[_i] = arguments[_i];
    }
    console.log(umbers);
}
sum(1, 2, 3, 6, 5, 8, 8);
// 函数的重载
// 在java中重载是两个函数名字一样,参数不一样
//  在ts中  仅仅是一个函数提供很多函数定义
