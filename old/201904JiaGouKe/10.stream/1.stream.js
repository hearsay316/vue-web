// 流是一个独立的模块
// 文件流 他是基于stream
let fs = require('fs');
let path = require('path');

// 读流  写流
// 内部 fs.read fs.write fs.open  fs.close
let rs = fs.createReadStream(path.resolve(__dirname,'1.txt'),{
    flags:'r',
    encoding:null,
    autoClose:true,
    start:0,
    highWaterMark:1,// 每次读取一个 字节
}); 
// 创建了一个可读流实例 

// 它内部是基于事件的events库，如果用户监听了data事件，内部会发射data事件，并且将将读取到的结果发射出来
// 非流动模式
rs.on('open',function(fd){
    console.log(fd);
}); // 当文件打开后 会触发 open事件  this.emit('open');
let arr = [];
rs.on('data',function(data){ // 一直将数据全部发射出来
    console.log('读取一次')
    rs.pause(); // 暂停data事件的触发 data事件不会再次触发了
    arr.push(data);
});
setInterval(()=>{
    rs.resume();
},1000)
rs.on('end',function(){ // 文件读取完毕后 会触发end =》 close
    let r = Buffer.concat(arr).toString();
    console.log(r);
})
rs.on('close',function(){ // 如果文件不能读取完毕 是不会触发 end 和 close的
    console.log('close');
})

// open close end data
// 有一个很大的文件 读一点 写一点  10  暂停，你去写如果你写完了 恢复 在继续读取
// 先实现一个 可读流
// 可写流  createWriteStream
// 流的类型 4种  读  写 双工  转化流

// http koa 
// express 
// mongo 

// webopack + react
// react router redux dva saga umi ts + react mysql

// 写项目 cms + 珠峰课堂 