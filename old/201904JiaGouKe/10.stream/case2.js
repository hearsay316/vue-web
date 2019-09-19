let fs= require('fs');
let WriteStream = require('./writestream')
let ws = new WriteStream('./1.txt',{
    flags:'w',
    encoding:'utf8',
    mode:0o666,
    autoClose:true,
    start:0,
    highWaterMark: 3, // 默认写入预期大小是 16k
})
// 写入10个数
 let i = 0; 
function write(){
    let flag = true; // 默认表示可以写入
    while(i<9 && flag){// 10个字节
        flag = ws.write(i++ +''); // string or Buffer
        console.log(flag);
    }
}
ws.on('drain',()=>{ // 如果我写入的内容达到了预期并且内存被整个写入了，就会触发drain事件
    console.log('drain');
    write();
})
 write();// 开始写入

// 缓存 如果第一次写入是真的像文件里写入 之后都是像内存中写入
