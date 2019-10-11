/*
* 100以为求一个数 3和5的倍数
* */

/*function multiple(num) {
    let arr = [];
    for (let i=0;i<num;i++){
        if(i%15===0){
           arr.push(i)
        }
    }
    return arr;
}*/

/*
console.log(multiple(1));
console.log((100 === 0 || 100 > 100));

function multiple(n) {
    if (n === 0 || n > 100) return 0;
    console.log(n % 15, 22)
    if (n % 15 === 0) {
        return n + multiple(n + 1)
    }
    return multiple(n + 1);
}*/
let ary = [1,[2,3,[4,5,[6,7,[8,9]]]]];
console.log(ary.toString().split(",").map(item=>+item));
let  啊 = {
    a:"sws"
}
console.log(啊.length);