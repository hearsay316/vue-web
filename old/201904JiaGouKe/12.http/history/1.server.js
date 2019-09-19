let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime'); // 可以根据路径返回一个 第三方模块 mime.getType()
// http://localhost:3000/
// http://localhost:3000/index.html
// http://localhost:3000/1.js
let server = http.createServer((req,res)=>{
    // 静态服务 根据不同的路径返还不同的资源(本地html js css)
    let { pathname }  = url.parse(req.url); // / /index.html /1.js
    let absPath = path.join(__dirname,pathname);
    fs.stat(absPath,function(err,stat){
        if(err){ // 如果路径不存在则404
            res.statusCode = 404;
            return res.end(`not found`);
        }
        if(stat.isDirectory()){
            // 如果是目录需要查找目录下是否有index.html
            absPath = path.join(absPath,'index.html');
            fs.access(absPath,function(err){
                if(err){
                    res.statusCode = 404;
                    return res.end(`not found`);
                }
                res.setHeader('Content-Type',mime.getType(absPath)+';charset=utf-8')
                fs.createReadStream(absPath).pipe(res);
            });
        }else{
            // fs.readFile => fs.createReadStream
            // 流的原理默认会调用可写流的write方法和end方法
            res.setHeader('Content-Type',mime.getType(absPath)+';charset=utf-8')
            fs.createReadStream(absPath).pipe(res);
        }
    })
});

server.listen(3000);