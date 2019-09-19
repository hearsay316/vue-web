/*
let reg =/^[.]+$/;  // 一个正则设置了^和$ ,那么代表的含义其实就是只能是

//[]
console.log (reg.test ("."));
console.log (reg.test ("nn"));*/

/*
let reg =/^[\d]+$/;  // 一个正则设置了^和$ ,那么代表的含义其实就是只能是

//[]
console.log (reg.test ("\\\d"));
console.log (reg.test ("422222222"));
*/
/*

let reg = /^[18][8]$/;
console.log (reg.test ("18"));
let reg1 = /^[12-65]$/;
console.log (reg1.test ("7"));
let age = /^[1-6][1-5]$/;
console.log (age.test ('70'));
*/

//let phone = /^1\d{10}/;
//console.log (phone.test ("15655219250"));

// 中文姓名 [\u4E00-\u9FA5]
/*
let reg = /^[\u4E00-\u9FA5]{2,}(·)?[\u4E00-\u9FA5]{2,}$/;
console.log (reg.test ('迪丽热巴'));
*/








/*

let a = {"a":"1",
        "b":"2",
        "c":"3"
}["a"];

console.log(a);
*/

/*let a = {n: 1};
let b = a;
a.x = a={n: 2};
console.log(a,b);
console.log (a === b.x);*/

let obj = {
    a:1,
    b:2
};
function func(obj) {
    obj.a = 2;
    obj  = [1,23,6];
    console.log(obj);
}
func(obj);
console.log(obj);