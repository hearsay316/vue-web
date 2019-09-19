// 服务器 静态服务 1.html?a=1  动态 接口动态数据库

let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
let mime = require('mime'); // 用来处理不同类型的

let server = http.createServer((req,res)=>{
    // 浏览器发起请求 /1.html?a=1   
    let {pathname} = url.parse(req.url);
    let filePath = path.join(__dirname,pathname);
    // 当前这个路径 是不是一个文件夹或者文件,如果不是就说明没有这个文件
    // 如果有这个文件，看一下是不是文件夹 文件夹去找index.html
    fs.stat(filePath,(err,statObj)=>{
        if(err){
            res.statusCode = 404;
            res.end(`Not Found`);
            return;
        }
        if(statObj.isDirectory()){
            let p = path.join(filePath,'index.html');
            fs.access(p,(err)=>{
                console.log(err);
                if(err){
                    res.statusCode = 404;
                    res.end(`Not Found`);
                    return;
                }else{
                    res.setHeader('Content-Type','text/html;charset=utf8');
                    fs.createReadStream(p).pipe(res);
                }
            })
        }else{
            // 是文件 ,通过路径可以给mime让他自动生类型
            res.setHeader('Content-Type',mime.getType(filePath)+';charset=utf8');
            fs.createReadStream(filePath).pipe(res);
        }
    })
});
server.listen(3000);
