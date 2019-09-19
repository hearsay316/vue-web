// proxy 代理
// 实现深度代理
let obj = [[1,2,3]]
function update(){
    console.log('数据更新');
}
// proxy + reflect 实现响应式的数据变化
let handler = { // 代理的方法有16中 
    set(target,key,value){
        if(key === 'length') return true;
        update();
        return Reflect.set(target,key,value);
    },
    get(target,key){
        if(typeof target[key] === 'object'){
            // 如果当前对象是object 继续做代理 ，返回当前这个对象的代理
            return  y],handler);
        }
        return Reflect.get(target,key);
    }
}
let proxyObj  = new Proxy(obj,handler)
proxyObj[0].push(123);
console.log(obj);
// 优点可以劫持不存在的属性
// 可以拦截数组

// 数组的方法 es5
// arrowFn
// symbol
// class 原型链 继承  装饰器。。。
// babel 
// ...