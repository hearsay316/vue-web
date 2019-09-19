let fs = require('fs');
// let {Duplex} = require('stream');
// let ws = fs.createWriteStream('./name.txt',{highWaterMark:4}); 


// class MyDuplex extends Duplex{
//     _write(chunk,encoding,callback){
//         console.log(chunk);
//         callback()
//     }
//     _read(){
//         this.push('123');
//         this.push(null);
//     }
// }
// let mws = new MyDuplex();
// mws.on('data',(data)=>{
//     console.log(data);
// })  
// mws.write('123');

// 压缩 转化的过程 

let {Transform} = require('stream'); // 转化流只能实现一个 _transform 方法

// 写流
// process.stdout.write('hello'); // console.log()
// // 读流
// process.stdin.on('data',(data)=>{
//     console.log(data);
// })

// 压缩 加密1
let crypto = require('crypto'); // md5 特点：摘要算法 不可逆 会把 不同的内容转化成相同的长度。 不同的内容输出的内容不同

let r = crypto.createHash('md5').update('1234').digest('base64');
class MyTransform extends Transform{
    _transform(chunk,encoding,callback){
        let r = crypto.createHash('md5').update(chunk).digest('base64')
        this.push(r); // 把输入的内容转化成大写
        callback();// 等待下一次写入
    }
}
process.stdin.pipe(new MyTransform).pipe(process.stdout);

// 读流 + 写流 on('data') on('end') pipe write end
// 双工 + 转化

// koa + express 