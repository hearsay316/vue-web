/*var ab = 10;
(function () {
    ab = 100;
    console.log(ab);
})();
console.log(ab);*/
let arr1 = [12,3,5,6];
let arr2 = [2,3,6,8,8,9,5];
//arr1.push(...arr2);
//let a = arr1.concat(arr2).reverse();
let a =arr1.unshift(...arr2);
console.log(arr1,a);