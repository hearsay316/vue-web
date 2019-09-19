// referer 来源


let http = require('http');
let fs = require('fs');
let path = require('path');
let urlParser = require('url');
let whiteList = [
    'b.zhufeng.cn'
]
http.createServer((req,res)=>{
    let url = path.join(__dirname,req.url);
    fs.stat(url,function(err,statObj){
        if(err){
            res.statusCode = 404;
            res.end();
        }else{
            // 拿到当前的引用来源和 当前资源的主机名 比较如果相等就正常返回 ，不想等返回错误内容
            let referer = req.headers['referer'] || req.headers['referrer'];
            if(referer){
                let r = urlParser.parse(referer).hostname;
                let host = req.headers.host.split(':')[0];
                if(r === host){
                    fs.createReadStream(path.resolve(__dirname,'1.jpg')).pipe(res);
                }else{
                    fs.createReadStream(path.resolve(__dirname,'2.jpg')).pipe(res);
                }
            }
            fs.createReadStream(url).pipe(res);
        }
    })  
    
}).listen(3000);

// gzip 压缩 流 转换流 