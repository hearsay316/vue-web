let fs = require('fs');

// fs 所有的方法 都有两个 同步的和异步的 
// 读取的时候 不加编码 默认是buffer类型
// let b = fs.readFileSync('./name.txt');

// readFile 读取比较小的文件 ，如果文件特别大 可能会导致内存溢出
// 64k以下的文件 都可以使用 readFile  流的操作
// 如果文件不存在会创建文件，写的时候 会默认清空文件
fs.readFile('./name1.txt',(err,data)=>{
    if(err) return console.log(err)
    fs.writeFile('./name2.txt',data,{flag:'a'},function(err){
        console.log('拷贝成功')
    })
});
// 读取一点 暂停 接着读取

// 自己来操作读取的个数 还有写入的个数
// open read write close close