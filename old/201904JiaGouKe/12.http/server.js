let http = require("http");
let url = require("url");
let path = require("path");
let fs = require("fs").promises;
let { createReadStream,readFileSync } = require("fs");
let mime = require("mime");
let crypto = require('crypto');
let ejs = require('ejs');
let chalk = require('chalk');
let template = readFileSync(path.resolve(__dirname,'template.ejs'),'utf8')
module.exports = class MyServer {
  constructor(config){ 
    this.template = template;
    this.config = config;
  }
  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url); 
    let absPath = path.join(this.config.cwd, pathname);
    try {
      let statObj = await fs.stat(absPath);
      if (statObj.isDirectory()) {
        // 如果当前是目录 目录下可能会有这个index.htmk
        absPath = path.join(absPath, "index.html");
        try{
          await fs.access(absPath);
        }catch(e){
          // 回到当前目录的上一级
          let dirPath = path.dirname(absPath);
          let dirs = await fs.readdir(dirPath); // 读取目录下的文件内容
          // ejs
          let currentPath = pathname.endsWith('/')?pathname:pathname+'/'
          let template = ejs.render(this.template,{currentPath,arr:dirs});
          
          res.setHeader('Content-Type','text/html;charset=utf-8')
          res.end(template);
          return
        }
      }
      this.sendFile(absPath, req, res,statObj);
    } catch (e) {
        console.log(e);
      this.sendError(e, req, res);
    }
  }
  // 关于缓存的方法
  async cache(filePath, req, res,statObj){
    // 强制缓存  是否启用对比缓存
    res.setHeader("Cache-Control", "no-cache"); 
    let lastModified = statObj.ctime.toGMTString()
    // ----------------------
    res.setHeader('Last-Modified',lastModified);
    let ifModifiedSince = req.headers['if-modified-since'];
    console.log(ifModifiedSince,lastModified )
    if(ifModifiedSince!==lastModified ) { // 对比最后的修改时间
        return false
    }
    // ----------------------
    let buffer = await fs.readFile(filePath);
    let md5 = crypto.createHash('md5').update(buffer).digest('base64')
    res.setHeader('Etag',md5);

    let ifNoneMatch = req.headers['if-none-match'];
    if(ifNoneMatch !== md5){
        return false
    }
    return true
  }
  zip(filePath, req, res,statObj){ 
    let encoding = req.headers['accept-encoding']; // 当前支持的压缩格式有哪些
    console.log(encoding);
    if(!encoding) return false;

    if(encoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip');
        return require('zlib').createGzip()
    }else if(encoding.match(/\bdefalte\b/)){
        res.setHeader('Content-Encoding','defalte');
        return require('zlib').createDeflate()
    }else{
        return false;
    }
  }
  async sendFile(filePath, req, res,statObj) {
    let cache = await this.cache(filePath, req, res,statObj)
    if(cache){
        res.statusCode = 304
        return res.end();
    }
    res.setHeader("Expires",new Date(Date.now()+10*1000).toGMTString())
    res.setHeader("Content-Type", mime.getType(filePath) + ";charset=utf-8");
    let gzip =  this.zip(filePath, req, res,statObj);
    if(gzip){ //返还的就是一个转化流
        createReadStream(filePath).pipe(gzip).pipe(res);
    }else{
        createReadStream(filePath).pipe(res);
    }
    
  }
  sendError(e, req, res) {
    res.statusCode = 404;
    res.end(`Not Found`);
  }
  start() {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.config.port,()=>{
      console.log(`
${chalk.yellow('Starting up http-server, serving ./')}
Available on:
  http://127.0.0.1:${chalk.green(this.config.port)}
Hit CTRL-C to stop the server
      `)
    });
  }
}





// i/o操作