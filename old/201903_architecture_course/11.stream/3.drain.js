let fs = require('fs');
let WriteStream = require('./writeStream');
let ws = new WriteStream('./name.txt',{
    flags:'w',
    encoding:'utf8',
    autoClose:true,
    start:0,
    highWaterMark:4 
});
// 写10个数 
let i = 0 ;
function write(){
    let flag = true;
    while(i< 10 && flag){
       flag =  ws.write(i+'','utf8',()=>{
       }); // 一个是字符串 另一个就是buffer'
       i++;
    }
}
write();
ws.on('drain',()=>{ // 如果当前内存没有达到预期 清空后是不会触发drain事件的
    console.log('干了');
    write();
})