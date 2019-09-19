// 1)  vue 重写数组的方法
let methods = ['push','pop','shift'];

let proto = Object.create(Array.prototype); // 做了一层链

// 切片 在前面增加逻辑，在函数执行后执行某些事
// 在原有的函数外部在增加一层
for(let method of methods){
    proto[method] = function(){
        // 在这里还需要调用原有的逻辑
        Array.prototype[method].call(this,...arguments);
        console.log('更新')
    }
}
let arr = [];
arr.__proto__ = proto;
arr.push(1);
console.log(arr);


// promise如何中断
Promise.resolve().then(()=>{
    console.log('ok');
}).then(()=>{ // 如何在这一层中将promise链中断
    // 如果执行到某一步   Promise.reject(); 出错
    return new Promise(()=>{})
}).then(()=>{
    console.log('成功')
}).catch(()=>{
    console.log('失败')
});

// 我能不能取消一个promise fetch 取消不了  ajax中断abort()


// 如果请求超时 我希望可以让当前的promise变成失败态


// 用promise来封装ajax ajax.abort
function wrap(p1){ //让一个promise变成失败态 就是让这个promise的本次结果就不采纳了
    let abort;
    let p2 = new Promise((resolve,reject)=>{
        abort = reject
    })
    let p = Promise.race([p1,p2]);
    p.canncel = abort;
    return p;
}
let fn = wrap(new Promise((resolve,reject)=>{ 
    setTimeout(() => {
        console.log('ok');
        resolve();
    }, 1000);
}));
fn.then(()=>{
    console.log('ok')
}).catch(err=>{
    console.log('err');
})
fn.canncel();



let arr = [1,2,3,4];
let [,...args,a] = arr;
console.log(args); // 错误写法




// minxin

// 可以混合某个功能  AOP
let MixIn1 = (superClass) => {
    return class extends superClass{
        beforeCreate() {
            console.log('创建之前 mixin1');
            super.beforeCreate();
        }
    }
}
let MixIn2 = (superClass) => {
    return class extends superClass{
        beforeCreate() {
            console.log('创建之前 mixin2');
            super.beforeCreate();
        }
    }
}
class Parent {
    beforeCreate() {
        console.log('创建之前 parent')
    }
}
class Child extends MixIn2(MixIn1(Parent)){
    beforeCreate() {
        console.log('创建之前 child');
        super.beforeCreate();
    }
}

let child = new Child();
child.beforeCreate();


// class 的问题
class MyClass {
    fn(){
        console.log(this);
    }
}
let myClass = new MyClass();
// function bind(){
//     function bind(){
//         fn.call(myClass);
//     }
//     bind.call(1)
// }
let fn = myClass.fn.bind(myClass).bind(1); // 类中的函数如果拿出来一定要绑定this指向
fn(); // undefined


// 展平数组的方法
let arr = [1, [2, [3, [4, [5, [6]]]]]];
console.log(arr.toString().split(','))
function flat(arr,index){ 
    return arr.reduce((prev,current)=>{ // [1]
        if(Array.isArray(current)){ // 如果是数组
            return prev.concat(flat(current));
        }else{
            prev.push(current);
        }
        return prev;
    },[]);
}
console.log(flat(arr,3));

// es6的模块 浏览器
// export default  export的区别 功能是一样的 import * as xxx来使用


const p =Promise.resolve();
;(()=>{
    const implicit_promise = new Promise(resolve =>{
        console.log(1)
        const promise = new Promise(resolve=>{
            console.log(2);
            resolve(p) // 会让这个p执行 取出他的结果
        }); 
        promise.then(()=>{ 
            console.log('after:await');
            resolve()
        })
    });
    return implicit_promise
})();
p.then(()=>{  // tick:a
    console.log('tick:a');
}).then(()=>{
    console.log('tick:b');
}).then(()=>{
    console.log('tick:c');
});
// 比较是哪个then先放到队列中

// async 函数转化成 promise的then是怎么转化的
async function async1(){
    console.log('async1 start')
    await async2(); // await 相当于 写了两个then
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
 console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end');
// script start  async1 start async2  promise1  script end promise2 setTimeout 