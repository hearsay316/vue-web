/*
let reg =/^[.]+$/;  // 一个正则设置了^和$ ,那么代表的含义其实就是只能是

//[]
console.log (reg.test ("."));
console.log (reg.test ("nn"));*/

let reg =/^[\d]+$/;  // 一个正则设置了^和$ ,那么代表的含义其实就是只能是

//[]
console.log (reg.test ("\\\d"));
console.log (reg.test ("422222222"));
