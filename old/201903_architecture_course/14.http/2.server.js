// 为了实现http服务端 node内部封装了http模块 -》 基于tcp模块

let http = require('http');
let url = require('url');
let server = http.createServer();
// 默认请求不到内容的时候 ，而且服务端没有响应 等待着服务端着服务端响应结束

// http解析过程，默认情况下 会链接tcp服务，tcp接受的是所有的请求的内容（tcp是没有标识的） 会根据请求的格式

server.on('request',(req,res)=>{ // req 是一个可读流 res是一个可写流
    // 请求中 有请求行 请求头 请求体 get请求没有请求体
    // 请求行相关的内容:
    let method = req.method; // method 方法是大写的
    let {pathname,query} = url.parse(req.url,true);
    let httpVersion = req.httpVersion
    
    // 请求头相关的内容:
    let headers = req.headers; // 所有的头的key参数都是小写的
    
    // 接受请求体,如果请求不存在会直接出发end事件
    let arr = [];
    req.on('data',function(data){
        arr.push(data);
    });
    req.on('end',function(){
        res.statusCode = 404; // ok
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        let contentType = req.headers['content-type']
        if( contentType === 'urlencoded/x-www-form-urlencoded'){
            let formData = Buffer.concat(arr).toString(); // a=1&b=2&c=3 => {a:1,b:2,c:3}
            // /([^&=]+)=([^&=]+)/g
            let obj = require('querystring').parse(formData);
            res.setHeader('Content-Type','application/json;charset=utf-8');
            return res.end(JSON.stringify(obj)); // string or buffer
        }
        if( contentType === 'application/json'){
            let jsonData = Buffer.concat(arr).toString();
            let obj = JSON.parse(jsonData);
            res.setHeader('Content-Type','application/json;charset=utf-8');
            return res.end(JSON.stringify(obj)); // string or buffer
        }
        res.end('我哎你'); // 结束响应 必须用end 
    });
});

// 固定的ip  固定端口号
let port = 3000;
server.listen(port,()=>{
    console.log('server start' + port);
});
// 如果出错 看一下是否端口已经被占用了
server.on('error',(err)=>{
    if(err.code === 'EADDRINUSE'){
        server.listen(++port); // 如果服务被占用启动一个新的端口
    }
});

// fs -> promise -> async + await 
// 每次更改服务端代码 都需要重启服务端
// 线下 nodemon  node monitor 可以监视代码的变化 重启服务  livserver supervisor