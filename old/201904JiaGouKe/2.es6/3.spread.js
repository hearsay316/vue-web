// 解构赋值  (结构相同可以直接拿出来使用)
// 既能声明 又能赋值
let [a,...args] = [1,2,3]; //  剩余运算符
console.log(a,args);
let {b:c} =  {a:1,b:2}
console.log(c); 
// 拓展运算符 展开运算符
let obj = {name:1}
let arr = [obj,2,3]; // 深拷贝 （拷贝后拷贝前无关）  浅拷贝（有关系的拷贝）
let newArr = arr.slice(0); // 浅拷贝
obj.name = 3;
console.log(newArr);
// ... slice Object.assign 浅拷贝
let obj = {name:1,age:{a:99},a:function(){},a:undefined,d:new RegExp()};
// let newObj = {...obj,age:{...obj.age}}

// 如何实现一个深拷贝
let r = JSON.parse(JSON.stringify(obj))
console.log(r);

// 递归拷贝 set .map


function deepClone(obj,hash = new WeakMap){
    // 先把特殊情况全部过滤掉 null undefined date reg
    if(obj == null ) return obj; // null 和undefine的都不理你
    if(typeof obj !== 'object')  return obj;
    if(obj instanceof Date)  return new Date(obj);
    if(obj instanceof RegExp) return  new RegExp(obj);
    // [] {} 判断是数组还是对象
    // 判断类型    typeof instanceof constructor
    if(hash.has(obj)){ // 有拷贝后的直接返还即可
        return hash.get(obj); // 解决循环引用的问题
    }
    let instance = new obj.constructor; // new 做了什么事 new实现原理
    hash.set(obj,instance); // 制作一个映射表
    // 把实例上的属性拷贝到这个对象身上 把原型链指向到原型对象上
    for(let key in obj){ // 递归拷贝
        if(obj.hasOwnProperty(key)){ // 不拷贝原型链上的属性
            instance[key] = deepClone(obj[key],hash);
        }
    }
    return instance;
}
let obj = {};
obj.a = obj;
let a = {name:1,age:obj}
console.log(deepClone(a));// 如何实现深度拷贝  weakMap