
// let Promise = require('./promise');
// 链式调用  先要获取 用户的姓名 通过用户名在获取用户年龄

let fs = require('fs');
// 不希望把异步逻辑串起来执行

function readFile(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,'utf8',function(err,data){
            if(err) reject(err);
            resolve(data);
        })
    })
}
// 如果promise中的then方法，无论是成功还是失败，他的返回结果是一个普通的时候就会把这个结果传递给外层的then的下一个then的成功回调
// 如果then的方法内部 成功 、失败 内部抛错就会走外层的then的下一个then的失败回调,如果下一个then没有错误处理 会继续向下找，如果找不到就报错
// 如果成功或者失败的回调的返回值 返回是一个promise 那么会让这个promise执行 采用他的状态
readFile('./name.txt').then((data)=>{ // age.txt
    return readFile(data+'1')
},err=>{
    throw new Error('xxx');
}).then((data)=>{
    console.log(data);
}).catch(err=>{
    console.log(err)
})
// promise 实现链式调用 靠的是返回一个新的promise,因为promise的状态 一旦确定 不能重新更改
// let p = new Promise((resolve,reject)=>{
//     resolve(1000);
// })
// let p2 = p.then(()=>{
//     throw new Error();
// })
// p2.then(()=>{

// },err=>{

// })