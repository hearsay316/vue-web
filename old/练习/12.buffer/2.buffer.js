//  buffer 能用到的常用方法  slice 截取 indexOf 有循环 有索引
let buffer = Buffer.from("逐层");
console.log (Buffer.isBuffer (buffer));


//  拼接数据
let buffer1 = Buffer.from("珠峰");
let buffer2 = Buffer.from("架构");

/*

let bigBuffer = Buffer.alloc(12);
Buffer.prototype.copy = function(target,targetStart,sourceStart=0,sourceEnd=this.length){
    for (let i = 0; i < sourceEnd; i++) {
        target[targetStart+i] = this[sourceStart+i];
    }
};
buffer1.copy(bigBuffer,0,0,6);
buffer2.copy(bigBuffer,6);
console.log(bigBuffer.toString());*/
Buffer.concat = function(list,totalLength = list.reduce((a,b)=>(a+b.length),0)){
let buffer = Buffer.alloc(totalLength);
let offset = 0;
list.forEach(buff=>{
    console.log(buff);
    buff.copy(buffer,offset);
    offset+=buff.length;
})
    return buffer;
};
console.log (Buffer.concat([buffer1, buffer2]).toString());
