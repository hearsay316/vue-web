let http = require('http');
http.createServer((req,res)=>{
    let agent = req.headers['user-agent'];
    if(agent.includes('iPhone')){
        res.statusCode = 302;
        res.setHeader('Location','http://www.qq.com');
        res.end();
    }else{
        res.statusCode = 302;
        res.setHeader('Location','http://www.baidu.com');
        res.end();
    }
}).listen(3000);