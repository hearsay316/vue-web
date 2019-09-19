let http = require("http");
let url = require("url");
let path = require("path");
let fs = require("fs").promises;
let { createReadStream,readFileSync } = require("fs");
let mime = require("mime");
let crypto = require('crypto');
let template = readFileSync(path.resolve(__dirname,'template.ejs'),'utf8')
// 解决this问题可以通过bind方法来解决
class MyServer {
  constructor(){ 
    // 所有的类中用的属性 或者值 都需要挂载当前的实例上
    this.template = template
  }
  async handleRequest(req, res) {
    // this=> Myserver  你可以用stat 、 access
    // NGINX  PROXY  你的前端 -》 代理服务 -》 node

    // 请求来了之后 我要跟他说可以访问
    // 设置运允许当前访问我的服务器可以访问我
    if (req.headers.origin) {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
      // 允许方法有哪些
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
      );
      res.setHeader("Access-Control-Allow-Headers", "name");
      // 一分钟内不要在发options
      res.setHeader("Access-Control-Max-Age", 60);
      res.setHeader("Access-Control-Allow-Credentials", true);
      // http 无状态的  跨域是不支持cookie传递的
      res.setHeader("Set-Cookie", "name=hello"); // 后端设置一个cookie

      if (req.method === "OPTIONS") {
        return res.end();
      }
    }

    let { pathname } = url.parse(req.url); // /user

    // 现在静态文件之前处理 动态的接口

    // restful api
    if (pathname === "/user" && req.method === "GET") {
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ name: "zfjg" }));
    }
    if (pathname === "/user" && req.method === "DELETE") {
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ name: "zfjg" }));
    }
    let absPath = path.join(__dirname, pathname);

    try {
      let statObj = await fs.stat(absPath);
      if (statObj.isDirectory()) {
        // 如果当前是目录 目录下可能会有这个index.htmk
        absPath = path.join(absPath, "index.html");
        try{
          await fs.access(absPath);
        }catch(e){
          // 回到当前目录的上一级
          console.log(absPath); // 12.http/index.html
          let dirPath = path.dirname(absPath);
          let dirs = await fs.readdir(dirPath); // 读取目录下的文件内容
          // ejs

          console.log(dirPath,'dirpath')
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
    server.listen(...arguments);
  }
}

// 开启一个服务 koa

let server = new MyServer();
server.start(3000);


// i/o操作