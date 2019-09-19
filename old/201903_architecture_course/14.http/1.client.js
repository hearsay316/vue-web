let http = require('http');
// 可以理解为 我要通过node请求另一个服务器
// get方法只能发get请求 request可以发其他请求可以增加请求体
let client = http.request({
    hostname:'localhost',
    port:3000,
    method:'post', // get是不能发送请求体的
    headers:{
        a:1,
        // 纯文本 text/plain
        // json  application/json
        // 表单格式 urlencoded/x-www-form-urlencoded
        // 'Content-Type':'urlencoded/x-www-form-urlencoded'
        'Content-Type':'application/json'
    }
},(res)=>{
    let arr = [];
    res.on('data',(data)=>{
        arr.push(data);
    });
    res.on('end',()=>{
        console.log(Buffer.concat(arr).toString());
    })
});
// 客户端发送的数据时候 
client.end(`{"a":1,"b":2}`);