// 文件 可写流 用法和可读流类似

let fs= require('fs');

let ws = fs.createWriteStream('./1.txt',{
    flags:'w',
    encoding:'utf8',
    mode:0o666,
    autoClose:true,
    start:0,
    highWaterMark: 5, // 默认写入预期大小是 16k
})
// 先读取64k => 写入 => 暂停读取 => 写入完毕后在去读取
// on('data') on('end') 读流 
// write  end

// 怎么处理多个异步请求 制作一个队列 排队执行

// flag表示是否达到写入的个数预期，如果超过（等于）了预期就返回false
let flag = ws.write('hell',()=>{ 
    console.log('write ok')
});
flag = ws.write('hello',()=>{ 
    console.log('write ok')
});
console.log(flag);

// 写入一个 等待一下 在继续写入