// 每个汉字 node 只支持uft-8的编码(一个汉字三个字节)  gbk一个汉字2个字节
// 如果编码不一样就会出现很多乱码错误 iconv-lite模块 可以解决 node不支持 gbk的
// 一个字节是由 8bit组成  8个二进制

let buffer = Buffer.alloc(5);
console.log(buffer);

let buffer0 = Buffer.allocUnsafe(1000);
console.log(buffer0.length);

let buffer1 = Buffer.from("逐层");
console.log(buffer1.length);

let buffer2 = Buffer.from([0x16]);
//console.log(buffer2.toString());
console.log((0x16).toString());
console.log(parseInt("101010", 2));  // 任意进制，转正10进制
// base64 取代所有url,不会发起请求，速度快，小图标。
let buf = Buffer.from("珠");
console.log(buf.toString('base64'));// 转成base64



let  buf2 = Buffer.from("珠峰前端");
let newBuffer = buf2.slice(3);
console.log(newBuffer.toString());

let arr = [[1,2,3]];
let newArr = arr.slice();
newArr[0][1]=100;
console.log(arr,newArr);



let buffer6 = Buffer.from("珠峰架构珠峰架构珠峰架构珠峰架构珠峰架构珠峰架构");

Buffer.prototype.split = function(sep){
	console.log(this.indexOf(sep));
	let pos = 0;
	let len = Buffer.from(sep).length;
  let arr = [];
  let current;
  while (-1!==(current = this.indexOf(sep,pos))) {

  	arr.push(this.slice(pos,current));
	  pos = len+current;
  }
  arr.push(this.slice(pos));
  return arr;
};
let arr1 = buffer6.split("珠峰");
console.log(arr1.toString());