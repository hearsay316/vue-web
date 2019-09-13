
let http = require('http');
let fs = require('mz/fs');
let url = require('url');
let path = require('path');
let mime = require('mime');
let server = http.createServer(async (req,res)=>{
    let {pathname} = url.parse(req.url);
    let filePath = path.join(__dirname,pathname);

    // 设置允许哪个源来访问我
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods','PUT,DELETE,POST,OPTIONS,GET');
    res.setHeader('Access-Control-Allow-Headers','a,Authorization');
    res.setHeader('Access-Control-Max-Age','10'); //限制多少秒之内不会再发送 options请求
    if(req.method === 'OPTIONS'){ // 允许预检请求通过可以访问我了
        res.statusCode = 200; 
        return res.end();
    }
    // 动态的接口  ajax
    if(req.method === 'GET' && pathname === '/user'){
        res.setHeader('Content-Type','application/json;charset=utf-8')
        return res.end(JSON.stringify({name:1}))
    }
    if(req.method === 'POST' && pathname === '/user'){
        res.setHeader('Content-Type','application/json;charset=utf-8')
        res.end(JSON.stringify({name:1}));
        return 
    }
    if(req.method === 'PUT' && pathname === '/user'){
        res.setHeader('Content-Type','application/json;charset=utf-8')
        res.end(JSON.stringify({name:1}));
        return 
    }

    // 静态的
    try{
        let statObj = await fs.stat(filePath);
        if(statObj.isDirectory()){
            // 如果是目录 就找index.html ，找到后返回
            filePath = path.join(filePath,'index.html');
            await fs.access(filePath);
        }
        res.setHeader('Content-Type',mime.getType(filePath)+';charset=utf8');
        fs.createReadStream(filePath).pipe(res);
    }catch(e){// 只要出错就返回404
        res.statusCode = 404;
        res.end('Not Found');
    }
});
server.listen(3003);


// http-server 启动一个本地的服务

function(){
    setTimeout(()=>{

    },3000)
}
fn();
fn();