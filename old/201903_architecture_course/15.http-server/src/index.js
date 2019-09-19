// 当前主要功能的文件

// 启动一个http服务
let http = require('http');
let chalk = require('chalk'); // 粉笔
let url = require('url');
let fs = require('mz/fs');
let mime = require('mime');
let path = require('path');
let ejs = require('ejs');
let template = fs.readFileSync(path.join(__dirname,'template.ejs'),'utf8');
class Server{
    constructor(config){
        this.config = config;
        this.template = template;
    }
    async handleRequest(req,res){
        // this 永远都是当前的实例
        // 如果访问的是一个目录 我要列出目录的列表
        // 如果访问的是一个文件夹 列出文件夹中的内容
        let {pathname} = url.parse(req.url);
        // 获取要查看的文件或者目录
        let filePath = path.join(this.config.dir,pathname);
        try{
            let statObj = await fs.stat(filePath);
            if(statObj.isDirectory()){
                // 读取目录中的所有的名字
                let dirs = await fs.readdir(filePath);
                dirs = dirs.map(item=>{
                    return {
                        value:item,
                        // 用父路径 加上自己的名字就是点击的路径
                        href:path.join(pathname,item)
                    }
                })
                let r = ejs.render(template,{dirs});
                res.setHeader(`Content-Type`,'text/html;charset=utf-8');
                res.end(r);
            }else{
                this.sendFile(filePath,req,res);
            }
        }catch(e){
            this.sendError(e,req,res);
        }
    }
    sendFile(p,req,res){
        // 发送静态文件
        res.setHeader(`Content-Type`,mime.getType(p)+';charset=utf-8');
        fs.createReadStream(p).pipe(res);
    }
    // 专门处理错误
    sendError(err,req,res){
        console.log(err);
        res.statusCode = 404;
        res.end(`Not found`);
    }
    start(){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.config.port,()=>{
            let yellow = `Starting up http-server, serving ${this.config.dir.split('/').pop()}\r\nAvailable on:\r\n`;
            console.log(`${chalk.yellow(yellow)}\r\n   http://localhost:${chalk.green(this.config.port)}
            `);
        })
    }
}
module.exports = Server;

