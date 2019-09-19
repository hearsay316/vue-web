
let http = require('http');
let fs = require('mz/fs');
let url = require('url');
let path = require('path');
let mime = require('mime');
let crypto = require('crypto');
let server = http.createServer(async (req,res)=>{
    let {pathname} = url.parse(req.url);
    let filePath = path.join(__dirname,pathname);
    res.setHeader('Cache-Control','no-cache');
    try{
        let statObj = await fs.stat(filePath);
        if(statObj.isDirectory()){
            // 如果是目录 就找index.html ，找到后返回
            filePath = path.join(filePath,'index.html');
            await fs.access(filePath);
        }   
        // 性能问题，如果文件比较大 去用这种方式 可能造成卡断，小文件可以使用这种方式
        // 我们一般情况下 用文件大小 来替代指纹 statObj.size  
        let tag = crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('base64');
        res.setHeader('Etag',tag); // if-none-match
        if(req.headers['if-none-match'] === tag){
            res.statusCode = 304;
            return res.end();
        }
        res.setHeader('Content-Type',mime.getType(filePath)+';charset=utf8');
        fs.createReadStream(filePath).pipe(res);
    }catch(e){// 只要出错就返回404
        res.statusCode = 404;
        res.end('Not Found');
    }
});
server.listen(3003);
// 缓存 = 强制缓存 + 对比缓存
// ? hash 戳  首页no-cache
// serviceWorker

// 防盗链
// 虚拟主机
// 服务器压缩
// 多语言
// 实现一个 范围请求

// koa koa 原理中间件 .... 文件上传 cookie session
// express 
// webpack 

// 遍历 出点选择题 