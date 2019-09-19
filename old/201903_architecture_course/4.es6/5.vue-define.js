let obj = [1,2,3];
// 要创造一个拦截器  AOP面向切面 
// 我们更改原型方法时 不要直接全部修改 否则以后用的都是修改后的 我们只希望当前observer调用后的数据需要调用我们阔栈的方法
let proto = Object.create(Array.prototype); // 我们穿件的proto是可以获取到Array.prototype上的所有的方法的
['pop' ,'push', 'shift', 'unshift' ,'reverse' ,'sort' ,'splice'].forEach(method=>{
    proto[method] = function(){
        update(); // 调用封装的update方法
        let old = Array.prototype[method]; // 调用原来原型上的方法
        old.call(this,...arguments);
    }
})
function update(){
    console.log('更新视图');
}
function observer(obj){
    if(Array.isArray(obj)){
        return obj.__proto__ = proto;
    }
    if(typeof obj !== 'object') return obj;
    for(let key in obj){
        defineReactive(obj,key,obj[key]);
    }
}
function defineReactive(obj,key,value){ // 数据劫持 深度劫持
    observer(value); // 如果是对象继续定义getter和setter
    Object.defineProperty(obj,key,{
        get(){ // 在get中收集
            return value
        },
        set(newValue){
            if(typeof newValue === 'object') {
                observer(newValue);
            }
            update();
            value = newValue
        }
    })
}
observer(obj);
obj.push(4);
console.log(obj);
