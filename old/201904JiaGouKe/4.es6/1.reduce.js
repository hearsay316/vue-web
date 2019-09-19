// es5 数组的常见的方法 reduce (收敛) map forEach filter..
// es6 findIndex
// function sum(...args){ // [1,2,3,4]
//     return args.reduce(function(previousValue,currentValue,currentIndex,array){
//         return previousValue+currentValue;
//     })
// }
// console.log(sum(1,2,3,4));

// let arr = [{price:1,count:10},{price:2,count:5},{price:3,count:6}]
// let r = arr.reduce(function(previousValue,currentValue,currentIndex,array){
//     return previousValue + currentValue.price*currentValue.count;
// },0);
// console.log(r);

// 实现一个reduce方法
Array.prototype.myReduce = function(callback,prev){
    for(let i = 0 ; i < this.length; i++){
        if(!prev){
            prev = callback(this[i],this[i+1],i+1,this);
            i++; // 第一次循环了两个变量，下次应该从第三个执行，所以向后移动
        }else{
            prev = callback(prev,this[i],i,this);
        }
    }
    return prev;
}
// let r = [1,2,3].reduce((p,c,index,array)=>{ // map 
//     if(index ===array.length -1 ){
//         return (p+c)/array.length;
//     }
//     return p+c;
// },0); //  指定第一项不会影响原来的数组的长度
// console.log(r); // 数组里有项 并且最少2个才能循环

Array.prototype.map = function(callback){ // filter find some every forEach
    let arr = [];
    for(let i = 0 ; i< this.length;i++){
        arr.push(callback(this[i]))
    }
    return arr;
}
let arr = [1,2,3].map(item=>item*2)
console.log(arr);

// reduce 中的应用  compose 组合函数 redux中间 流程控制
function sum(a,b){
    return a+b;
}
function len(str){
    return str.length
}
function addPrefix(content){
    return '$'+content;
}
// console.log(addPrefix(len(sum('x','y'))))
// function compose(...fns){
//     return function(...args){
//         let lastFn = fns.pop();
//         return fns.reduceRight((prev,current)=>{
//             return current(prev)
//         },lastFn(...args))
//     }
// }
// let compose = (...fns) => (...args) =>{
//     let lastFn = fns.pop();
//     return fns.reduceRight((prev,current)=> current(prev),lastFn(...args))
// }
// a:addPrefix b:len   
// function(...args){return addPrefix(len(...args))}
// a:function(...args){return addPrefix(len(...args))}  b:sum
// function compose(...fns){
//     return fns.reduce(function(a,b){
//         return function(...args){
//             return a(b(...args))
//         }
//     })
// }
let compose = (...fns)=>fns.reduce((a,b)=>(...args)=>a(b(...args)));
let r = compose(addPrefix,len,sum)('x','y');
console.log(r);

// 请事先 Array.prototype.flat();
// 用reduce来实现展平方法
console.log([[1,[2],[3,[4,[5]]]]].flat(4));
