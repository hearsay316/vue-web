export {};
let root: HTMLElement | null = document.getElementById("root");// 联合类型
let dom: any = document.getElementById("dom"); //any类型 牛逼
root!.style.color = "red"; //加!是强行指定为有后面这个方法或者属性
let x:undefined|null|number;
x= undefined;
/**void 类型没有返回值
 * 可以返回数字和undfined 但是不能为null
 * @strictNullChecks
 * */
function greeting() :void {
return undefined
}
