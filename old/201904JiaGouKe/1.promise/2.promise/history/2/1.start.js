
let Promise = require('./promise');
// promise 主要解决的就是异步问题
let p = new Promise((resolve,reject)=>{ 
    setTimeout(()=>{
        reject('有钱了');
    },1000);
});
let p1 = p.then((data)=>{ 
    console.log('success',data)
},(err)=>{ 
    console.log('fail',err)
});
let p2 = p.then((data)=>{ 
    console.log('success',data)
},(err)=>{ 
    console.log('fail',err)
});
console.log(p1 === p2);
// 模拟 用promise 抛硬币

// let point = ()=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             if(Math.random()<0.5){
//                 resolve();
//             }else{
//                 reject()
//             }
//         },Math.random()*1000*10)
//     })
// }
// point().then(()=>{
//     console.log('正')
// },()=>{
//     console.log('反')
// })