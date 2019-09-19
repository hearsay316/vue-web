// fs 也是一个核心模块 所有文件 文件夹 和文件系统相关的方法
let fs = require('fs'); // readFile readFileSync;
let path = require('path');

// 以utf8的格式写入


// base64 utf8 node不支持gbk 
let buf = Buffer.from('珠峰');
// console.log(buf.toString('utf8'));
// writeFile 默认写入的是utf8编码 并且如果文件不存在会创建这个文件,如果文件存在会清空文件中的内容
// readFile 如果文件不存在直接报错 默认编码 buffer

// r read   w write  a append 
// r+ 以读为准可以写  w+ 以写为准可以读
// fs.writeFileSync(path.resolve(__dirname,'1.txt'),buf,{flag:'a'});

// fs.writeFile(path.resolve(__dirname,'1.txt'),buf,{flag:'a'},function(err){
//     console.log('write ok')
// });

// 拷贝
function copy(source,target,fn){ // copyFile
    // 如果文件非常大readFile 淹没了我们的可用内存 可能导致内存溢出
    fs.readFile(source,function(err,data){
        if(err) return console.log(err);
        fs.writeFile(target,data,function(err){
            if(err) return console.log(err);
            fn();
        })
    });
}
// 读取一点写入一点 fs.read fs.write 可以使用较少的内存 （流的原理）
copy('1.txt','2.txt',function(){
    console.log('拷贝成功')
});