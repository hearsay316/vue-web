let http = require('http');

let httpProxy = require('http-proxy');

let proxyServer = httpProxy.createProxyServer();
let proxys = {
    'a.zhufeng.cn:8080':'http://localhost:3000',
    'b.zhufeng.cn:8080':'http://localhost:4000',
}
http.createServer((req,res)=>{
    let host = req.headers.host
    let target = proxys[host];
    proxyServer.web(req,res,{
        target
    });
}).listen(8080)