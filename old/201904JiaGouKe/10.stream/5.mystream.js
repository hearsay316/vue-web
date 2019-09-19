// 自己实现可读流

let {Readable,Writable,Duplex,Transform}  = require('stream');
let fs = require('fs');
// class MyReadStream extends Readable{
//     _read(){
//         this.push(fs.readFileSync('./1.txt'));
//         this.push(null); // 遇到null 就停止
//     }
// }

// let my = new MyReadStream();
// my.on('data',function(data){
//     console.log(data)
// })

class MyWriteStream extends Writable{
    _write(chunk,encoding,callback){ // clearBuffer
        console.log(chunk);
        callback(); // this.clearBuffer
    }
}
let w = new MyWriteStream();
w.write('123');
w.write('123'); // 再次调用write 会被缓存起来，只有上一次_write触发了回调才会继续进行写入操作

// 双工

// class MyDuplex extends Duplex{
//     _read(){
//         console.log('read')
//     }
//     _write(){
//         console.log('write')
//     }
// }

// let my = new MyDuplex();
// my.on('data',function(){

// })
// my.write('123');



// process.stdin.on('data',function(data){
//     process.stdout.write(data);
// })
// 加密 实现一个加密操作

let crypto = require('crypto');
// md5 摘要算法 加密 解密 摘要的时候并不是完整的内容 不能反解
// md5 输出的结果长度是一致
// 不同的内容输出的结果不同 雪崩
// md5 相同的内容输出的结果就是相同的
// 加密密码 撞库 可以加盐  增加密码的复杂度
class MyTransform extends Transform{
    _transform(chunk,encoding,callback){ // _write一样
        let r = crypto.createHash('md5').update(chunk).digest('base64');
        this.push(r);
        callback();
    }
}
let transfrom = new MyTransform();
// 压缩
process.stdin.pipe(transfrom).pipe(process.stdout)

// on('data') on('end') write end pipe

// http 周末 http基础 http 应用  封装http开始koa

// 作业：
// 1) 实现广度遍历 异步 -》promise async + await
// call new的原理
// http://www.javascriptpeixun.cn/course/194/tasks
// 2) 出套小题


// 事件流 发布订阅 tapable
