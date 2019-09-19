// 数组的常见方法 es5
// forEach reduce map filter some every /   find findIndex / includes

// reduce 收敛 复合 把多个结果收敛成一个
// 数组扁平化 求和 平均数
// let r1 = [1,2,3,4,5].reduce((previousValue,currentValue,currentIndex,arrary)=>{
//     // if(currentIndex === arrary.length -1){
//     //     return (previousValue+currentValue)/arrary.length
//     // }
//     return previousValue+currentValue;
// });
// console.log(r1);

// let arr = [[1,2,3],[4,5,6],[7,8,9]];
// let all = arr.reduce((a,b)=>{
//     return [...a,...b];
// })
// console.log(all);

// 作业let newArr = [[1,2,3,[4,5,[6]]],[4,5,6,[7,8,[9]]],[7,8,9]]; // flatten

// compose 组合

function sum(a,b){
    return a+b;
}
function add$(str){
    return '$'+str;
}
function len(str){
    return str.length
}
// redux中间件的原理 
// function compose(...fns){ // 剩余运算符,剩余运算符只能放在参数的最后的位置
//     return function(...args){
//         let fn = fns.pop();
//         return fns.reduceRight((a,b)=>{ // a => "ab"  b=> "len"
//             // a=> 2 b=>add$
//             return b(a);
//         },fn(...args))
//         // ruduce参数的问题
//     }
// }
// let compose = (...fns)=> (...args)=>{
//     let fn = fns.pop();
//     return fns.reduceRight((a,b)=>b(a),fn(...args));
// }
// function compose(...fns){ 
//     return fns.reduce(function(a,b){
//         return function(...args){
//             return a(b(...args));
//         }
//     })
// }
// 组合函数
// let compose = (...fns) => fns.reduce((a,b)=>(...args)=>a(b(...args)));
// let r = compose(add$,len,sum)('a','b');
// // let r = add$(len(sum('a','b')));
// console.log(r);


// let keys = ['name','age'];
// let values = ['珠峰',10];

// let obj = keys.reduce((a,b,i)=>(a[b] = values[i],a),{})
// console.log(obj);

// reduce 功能是最重要的 map forEach没有返回值

Array.prototype.reduce = function(callback,prev){
    for(let i = 0; i< this.length ;i++){
        if(typeof prev == 'undefined'){
            // 如果第一次没有传递 遍历两个 并且i++;
            prev = callback(this[i],this[i+1],i+1,this);
            i++;
        }else{
             // 如果第一次传递参数 就把第一次的prev作为prev传递下去
            prev = callback(prev,this[i],i,this);
        }
    }
    return prev;
}
// reduce 在内部会自动循环
let r1 = [1,2,3,4,5].reduce((previousValue,currentValue,currentIndex,arrary)=>{
    return previousValue+currentValue;
});
console.log(r1);

// forEach map some 看是否有true  every 是否有false  filter 过滤返回true表示留下
// find 返回true 会把当前项返回 
// includes 看是否包含 true es