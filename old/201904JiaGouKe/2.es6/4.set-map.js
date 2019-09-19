// set / map 去重

// set 放的是一个个的值 map 放的是键值对
// Symbol.interator for of forEach

let set = new Set([1,2,3,1,2,3]);
set.add(5)
set.forEach(element => {
    console.log(element);
});
console.log(set.values()); 
// Object.entries  es5
// Object.keys() 
// Object.values()
// let obj = {name:1,age:2}
// console.log(Object.entries(obj));

// 请实现 交集 并集 差集

let arr1 = [1,2,3,4,1,2,3];
let arr2 = [4,5,6];


function union(arr1,arr2){
    
    let s = new Set([...arr1,...arr2]);
    return [...s];
}
console.log(union(arr1,arr2));

let arr1 = [1,2,3,4,1,2,3];
let arr2 = [4,5,6];
function intersection(arr1,arr2){
    let s1 = new Set(arr1);
    let s2 = new Set(arr2); // has
    return [...s1].filter(item=>{
        return s2.has(item)
    })
}
console.log(intersection(arr1,arr2));

let arr1 = [1,2,3,4,1,2,3];
let arr2 = [4,5,6];
function difference(arr1,arr2){
    let s1 = new Set(arr1);
    let s2 = new Set(arr2); // has
    return [...s2].filter(item=>{
        return !s1.has(item)
    })
}
console.log(difference(arr1,arr2));

// 内存泄漏  浏览器 垃圾会收机制 标记清除
let map = new Map([['a',1],['a',100],['b',2]]); // 二维数组  {a:1,b:2}
let obj = {name:1}
map.set(obj,1);
obj = null;
console.log(map);