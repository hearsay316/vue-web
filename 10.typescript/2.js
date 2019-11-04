"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root = document.getElementById("root"); // 联合类型
var dom = document.getElementById("dom"); //any类型 牛逼
root.style.color = "red"; //加!是强行指定为有后面这个方法或者属性
var x;
x = undefined;
/**void 类型没有返回值
 * 可以返回数字和undfined 但是不能为null
 * @strictNullChecks
 * */
function greeting() {
    return undefined;
}
