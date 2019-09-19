// dva 
// generator 是属于es6规范里的 他生成的函数 不会原来的函数一样，暂停的功能
// * yield 产出
function *gen() {
    yield 1;
    yield 2;
}
let r = gen();
console.log(r.next()); 
console.log(r.next());
console.log(r.next());// r返回的是一个迭代器 需要自己去迭代
// 迭代器是一个对象 对象上有一个next方法 调用后会返回 {value,done}

 // 类数组 对象 有length 有 索引  可迭代
// let r= Array.from({0:1,1:2,length:2}); // 将类数组转化成数组
// let r1 = [
//     ...{
//         0:1,
//         1:2,
//         length:2,
//         [Symbol.iterator]:function*() {
//             let index = 0;
//             while (index !== this.length) {
//                 yield this[index++];
//             }  
//         }
//         // [Symbol.iterator]:function () {
//         //     let index = 0;
//         //     return {
//         //         next:()=>{ // 如果done返回false 就会不停的调用 next方法
//         //            return {value:this[index],done:index++ === this.length}
//         //         }
//         //     }
//         // }
//     }
// ]
// console.log(r1);

// function * b(){
//     yield 3
//     yield 4
//     yield 5
// }

// // 如果希望在一个gen函数中调用另一个函数 那就 用  * gen()
// function * a() {
//     yield 1;
//     yield 2
//     yield * b()
// }
// let r = a();
// console.log(r.next());
// console.log(r.next());
// console.log(r.next());
// console.log(r.next());
// console.log(r.next());

// 处理异步

// function * test() {
//     let a = yield 1;
//     console.log(a);
//     let b = yield 2;
//     console.log(b);
//     return b
// }

// let r1 = test();
// r1.next();
// r1.next(100);
// r1.next(200);
let fs = require('fs');
function readFile(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,'utf8',function(err,data){
            if(err) reject(err);
            resolve(data);
        })
    })
}
// function * read() { // iterator => it
//     let age = yield readFile('./name.txt','utf8');
//     let r = yield 1;
//     return r; 
// }
// function co(it) {  // express koa 中间的件的原理
//     return new Promise((resolve,reject)=>{
//         function next(data){ // 递归执行，直到结束后即可
//            let {value,done} = it.next(data);
//            if(done){
//             resolve(value);
//            }else{ // value可能不是一个promise
//             Promise.resolve(value).then((data)=>{
//                 next(data);
//             },reject); // 有一个失败了就失败了
//            }
//         }
//         next();
//     })
// }
// let co = require('co');
// co(read()).then(data=>{
//     console.log(data,'===');
// }).catch(e=>{

// })

// async 函数返回的是一个promise
async function read() { // iterator => it  async+await = genterator + co
    try{
        let age = await readFile('./name.txt1','utf8');
        return age 
    }catch(e){
        console.log('e',e)
    }
}
read().then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err)
})