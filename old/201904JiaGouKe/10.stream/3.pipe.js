// pipe 管道 实现读取一点写一点

let ReadStream = require('./readstream');
let WriteStream = require('./writestream');

let rs = new ReadStream('./2.txt',{
    highWaterMark:4 // 64k
})

let ws = new WriteStream('./1.txt',{
    highWaterMark:1 // 16k
})
rs.pipe(ws); // 异步 可以自己控制读写的速率

let fs = require('fs');

let r =fs.createReadStream('1.txt');
let w =fs.createWriteStream('3.txt');
r.pipe(w); // w的write方法会被自动调用