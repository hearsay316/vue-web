let http = require('http');

let zlib = require('zlib');
let fs = require('fs');
let path = require('path');
// gzip 压缩 转化流
http.createServer((req,res)=>{
   let encodings =  req.headers['accept-encoding'];
   if(encodings){
      if(encodings.match(/\bgzip\b/)){
          res.setHeader('Content-Encoding','gzip')
        fs.createReadStream(path.resolve(__dirname,'1.txt')).pipe(zlib.createGzip()).pipe(res);
      }else if(encodings.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding','deflate')
        fs.createReadStream(path.resolve(__dirname,'1.txt')).pipe(zlib.createDeflate()).pipe(res);
      }
   }
}).listen(3000);

// 正向代理 反响代理
// cookie - session  jwt-token