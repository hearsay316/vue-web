let fs = require('fs');

let ws = fs.createWriteStream('./name.txt',{
    flags:'w',
    encoding:'utf8',
    autoClose:true,
    start:0,
    highWaterMark:2 // 我期望用多少内存，超过预期返回false，如果和预期一样 也是false
});
let n = ws.write('1',()=>{
    console.log('wirte ok')
});
n = ws.write('2',()=>{
    console.log('wirte ok')
});
n = ws.write('3',()=>{
    console.log('wirte ok')
});

ws.end('123'); // => fs.write() 清空所有的内存 之后再关闭掉fs.close()
 // write after end