// buffer 代表的是内存 
// buffer一旦声明后不能随便更改大小 
// buffer 比较像数组里 存放着很多个16进制 

let buffer = Buffer.alloc(5); // 在node中最小单位 字节，安全的 默认会清空buffer

// buffer可以和字符串互相转化

let buf = Buffer.from('珠峰'); // node 中只认 utf8  可以使用其他的编码库 进行转码

console.log(Buffer.isBuffer(buf)); // 字节的长度





let buf1 = Buffer.from('珠');
let buf2 = Buffer.from('峰');
Buffer.concat = function(bufferList,len=bufferList.reduce((a,b)=>a+b.length,0)){
    let buffer = Buffer.alloc(len);
    let offset = 0;
    bufferList.forEach(buf=>{
        buf.copy(buffer,offset);
        offset += buf.length;
    })
    return buffer;
}
console.log(Buffer.concat([buf1,buf1,buf1,buf2]).toString());
// let r = Buffer.from([22]); //可以通过数组的方式声明
// let buf1 = Buffer.from('珠峰')
// let a = buf1.slice(0,3); // 浅拷贝
// console.log(a.toString());

let buf3 = Buffer.from('珠我峰我你');

Buffer.prototype.split = function(sep){ // slice + indexOf = split
    let arr = [];
    let len = Buffer.from(sep).length; //  分割符号的长度
    let offset = 0;
    let current;
    while(-1!=(current = this.indexOf(sep,offset))){
        // 找到的位置 加上便宜量
        arr.push(this.slice(offset,current));
        offset = current+len;
    }
    arr.push(this.slice(offset));
    return arr;
}
console.log(buf3.split('我').toString());
// alloc 根据长度声明buffer
// from 可以用字符串来声明buffer
// isBuffer 是不是buffer
// 具备着数组的常用方法 forEach slice
// toString() 
// concat   *
// 前端给服务端发数据  分片 分段 把很多数据拼在一起
// split 方法


// let bigBuffer = Buffer.alloc(6); // 数据的合并
// // targetBuffer 目标buffer targetStart 目标的开始 sourceStart sourceEnd
// Buffer.prototype.copy = function(targetBuffer,targetStart,sourceStart=0,sourceEnd=this.length){
//     for(let i = 0 ; i < sourceEnd - sourceStart;i++){
//         targetBuffer[targetStart+i] = this[i];
//     }
// }
// buf1.copy(bigBuffer,0,0,3);
// buf2.copy(bigBuffer,buf1.length); // copy 特点就是把当前的buffer依次循环到目标上
// console.log(bigBuffer.toString());