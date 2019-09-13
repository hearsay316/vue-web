let fs = require('fs');
// r 读的意思 
// w 写的意思  
// a 追加
// r+ 可读可写  r+ 表示文件不存在就报错
// w+ 可写可读  w+ 表示文件不存在会创建

// fd 文件描述符
// 0o666  2 读取 4 写入 1 执行  chmod -R 777 * 
// let buf = Buffer.alloc(3);
// fs.open('./name1.txt','r',0o666,(err,fd)=>{
//     // fd 文件描述符
//     // buf 要读取到哪个buffer中
//     // offset 指代的是 从buffer的哪个位置开始
//     // length 向buffer中写入多少个
//     // position 从文件的哪个位置读取
//     fs.read(fd,buf,0,3,0,(err,bytesRead)=>{
//         console.log(bytesRead);
//         console.log(buf);
//     })
// });
// let buf1 = Buffer.from('珠峰');
// fs.open('./name1.txt','w+',(err,fd)=>{
//     fs.write(fd,buf1,3,3,0,(err,written)=>{
//         fs.close(fd,()=>{
//             console.log('文件关闭成功')
//         })
//     })
// });

// pipe  pipe的原理。。。
const BUFFER_SIZE = 3; // 流 原理就是这一坨 美化的很漂亮
let buffer = Buffer.alloc(BUFFER_SIZE);
fs.open('./name2.txt','w',(err,wfd)=>{
    fs.open('./name1.txt','r',(err,rfd)=>{
        let readOffset = 0;
        function next(){
            fs.read(rfd,buffer,0,BUFFER_SIZE,readOffset,(err,bytesRead)=>{
                // 如果读取不到内容了
                if(!bytesRead) {
                    fs.close(rfd,()=>{});
                    fs.close(wfd,()=>{});
                    return 
                }
                readOffset += bytesRead; // 读取的时候 每次读取完毕后 都需要向后 维护偏移量
                fs.write(wfd,buffer,0,bytesRead,(err,byteWritten)=>{
                    // 写的偏移量 会自动维护
                    next();
                });
            });
        }
        next();
        
    })
})
