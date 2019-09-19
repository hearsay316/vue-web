// 属性的定义

let obj = {}
// obj.a = 100;// 默认是可枚举,可枚举的属性 可以被循环
let a = 100;
Object.defineProperty(obj,'a',{ 
    enumerable:true, // 是否可枚举
    configurable:true,// 是否可删除
    // writable:true, // 是否可改写
    get(){ // 属性访问器
        return a;
    },
    set(val){
        a = val;
    }
});
obj.a =200;
console.log(obj.a);

let obj = {
    _a:100,
    get a(){
        return this._a;
    },
    set a(val){
        this._a = val
    }
}
obj.a = 200;
console.log(obj.a);


// vue 里面的特点 响应式的数据变化 如果数据变化了 更新视图


