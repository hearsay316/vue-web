let fs = require('fs');
let path = require('path');
let ReadStream = require('./readstream');
let rs = new ReadStream(path.resolve(__dirname,'1.txt'),{
    flags:'r',
    encoding:null,
    autoClose:true,
    start:0,
    end:10, // 包前又包后
    highWaterMark:2,
}); 
rs.on('open',function(){
    console.log('open')
});
setInterval(()=>{
    rs.resume();
},1000)
let arr = [];
rs.on('data',function(data){
    console.log(data.length);
    arr.push(data);
    rs.pause();
});
rs.on('end',function(){
    let r = Buffer.concat(arr).toString();
    console.log(r);
});
rs.on('close',function(){
    console.log('close')
})