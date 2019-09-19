// 为了实现文件的操作 fs
let fs = require('fs');
let ReadStream = require('./ReadStream');
let rs = new ReadStream('./age.txt',{
    flags:'r',
    encoding: 'utf8', // 读取出来的默认是buffer
    autoClose:true, // 文件需不要关闭
    start:0,
    end:5, // 包前又包后
    highWaterMark:3, // 每次读取多少, 默认每次最多读64k
});
let arr = [];  // 文件的分片上传
rs.on('open',(fd)=>{
    console.log(fd);
})
rs.on('data',(data)=>{
    console.log(data)
    arr.push(data);
    rs.pause();
}); // 如果用户监听了data时间 就emit('data','xxx')
// fs 它内部实现了流 
rs.on('end',()=>{ // 如果数据没有读取完毕 则不会触发end事件
   console.log(arr);
});
rs.on('close',()=>{
    console.log('close')
});
rs.on('error',(err)=>{
    console.log(err);
})

// open data  pause resume end