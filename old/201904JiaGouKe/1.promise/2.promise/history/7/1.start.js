let fs = require('fs');
// let Promise = require('./promise');
let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1000);
    },1000)
});
let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(2000);
    },2000)
});
// 获取名称 和 年龄
let isPromise =(val)=>{
    if(typeof val === 'function' || (typeof val == 'object' && val !== null)){
        if(typeof val.then === 'function'){
            return true
        }
    }
    return false;
}
Promise.all = function (values) {
    return new Promise((resolve,reject)=>{
        let arr = []; // 最终的结果
        let i = 0;
        function processData(key,val) {
            arr[key] = val; // 为了实现key和值对应上 需要构建数组 依次往里面放，只有成功5次后在去调用最终的方法
            if(++i == values.length){
                resolve(arr);
            }
        }
        for(let i = 0 ; i<values.length;i++){
            let current = values[i];
            if(isPromise(current)){
                current.then(y=>{
                    processData(i,y);
                },reject)
            }else{
                processData(i,current);
            }
        }
    })
}
Promise.race = function (values) {
    return new Promise((resolve,reject)=>{
        for(let i = 0 ; i<values.length;i++){
            let current = values[i];
            if(isPromise(current)){
                current.then(resolve,reject)
            }else{
                resolve(current)
            }
        }
    })
}
// 有个请求 希望访问两个网站，都可以返回结果
Promise.race([1,p,p1,2,3]).then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
});
// 练习 不要求多