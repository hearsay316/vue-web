// spread 展开运算符号 // ... 只能展开一层.
//浅拷贝 拷贝的时候是带着空间拷贝的，深拷贝 就是整个重新拷贝了一份
let o = {room:10}
let school = {room:o};
let my = {money:100};
// let obj = Object.assign(school,my)
let obj = {...school,...my}  // 
o.room = 100;
console.log(obj);

// 如何实现对象的深拷贝
let obj = {a:{a:{a:1,fn:function(){},a:undefined,reg:/\d+/}}};
let a = JSON.parse(JSON.stringify(obj)); 
console.log(a);

// 如何实现一个深拷贝 递归+类型判断
// instanceof原理 判断当前__proto__ 是否有 RegExp.prototype
let obj = {};
// weakMap = {obj=>instance}
obj.a = obj; // 我要把拷贝后的结果保留起来 下次用的时候 直接返还回去即可
function deepClone(obj,hash=new WeakMap()){ 
    if(obj == null) return obj; 
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    // ...
    if(typeof obj !== 'object') return obj;
    // 其他情况 对象 / 数组
    if(hash.has(obj)) return hash.get(obj); // 我就把上次拷贝的后的返还给你
    let instance = new obj.constructor
    hash.set(obj,instance); // 把当前拷贝前的和拷贝后的做一个映射
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            instance[key] = deepClone(obj[key],hash); // 如果是对象就继续深拷贝
        }
    }
    return instance;
}
console.log(deepClone(obj));