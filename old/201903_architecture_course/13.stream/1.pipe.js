let fs = require('fs');

// 文件的拷贝 fs.readFile + fs.writeFile

let rs = fs.createReadStream('./name.txt',{highWaterMark:4}); // 64k

let ws = fs.createWriteStream('./new,txt',{highWaterMark:1});

rs.pipe(ws);  // 读取一点写一点，在读取的过程 是获取不到数据，文件小的情况下用readFile

// rs.on('data',(d)=>{
//     let flag =  ws.write(d);
//     if(!flag){
//         rs.pause();
//     }
// })
// ws.on('drain',()=>{
//     console.log('当前写入的四个字节都写入成功了');
//     rs.resume();
// })