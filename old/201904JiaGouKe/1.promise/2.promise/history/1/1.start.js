// promise 承诺 
// pending 等待态  fulfilled 成功态 rejected 失败态
// 类 new es6.promise
// p就是一个promise的实例
let Promise = require('./promise')
let p = new Promise((resolve,reject)=>{ // executor执行器
    resolve(1234);
    reject(4567);
    throw new Error('钱丢了'); // 一旦发生错误就会执行失败态
});
// 每一个promise中的实例上都会有一个then方法
p.then((data)=>{ // 成功函数
    console.log('success',data)
},(err)=>{ // 失败函数
    console.log('fail',err)
});

