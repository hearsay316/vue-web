
// es6中的set和map （方的东西都是唯一的）

let arr = [1,2,3,4,5,1,2];

let s = new Set(arr);
// for of语法只能迭代数组 或者有Symbol.iterator的方法
// for(let a of s.values()){ // Object.entries Object.keys Object.values() es5
//     console.log(a)
// }
// set{1,2,3,4,5}
// let obj = {a:1,b:2,c:3}
// console.log(Object.values(obj))

// set的应用 可以去重 求数组的并集  交集 差集

let arr1 = [1,2,3,1,2];  // [1,2,3]
let arr2 = [3,4,5,3,1];  // [1,3,4,5]
 
function union(){
    let s1 = new Set([...arr1,...arr2]); // [1,2,3,4,5]
    let all = [...s1];
    return all
}
console.log(union());

function inserction(){
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    return [...s1].filter(function(a){
        return s2.has(a);
    })
}
console.log(inserction());

function deff(){
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    return [...s2].filter(function(a){
        return !s1.has(a);
    })
}
console.log(deff());

// map的key可以是任意类型 
// let map = new Map([['name','zf'],['age','9'],['age','100']]); weakMap
class A{

}
let a = new A();
let map = new Map();
map.set(a,1);
a = null;


