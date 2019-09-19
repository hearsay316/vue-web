let http = require("http");
let url = require("url");
let path = require("path");
let fs = require("fs").promises;
let { createReadStream } = require("fs");
let mime = require("mime");
let crypto = require('crypto');

// 解决this问题可以通过bind方法来解决
class MyServer {
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
        absPath = path.join(absPath, "index.html");
        await fs.access(absPath);
      }
      this.sendFile(absPath, req, res,statObj);
    } catch (e) {
        console.log(e);
      this.sendError(e, req, res);
    }
  }
  cache(){
       // 专门用来发送文件的
    // 发送文件 设置1分钟内不要在发请求了
    // no-cache 表示每次都像服务器验证 浏览器是有缓存
    // no-store 每次都向服务器验证 浏览器是没有缓存
    res.setHeader("Cache-Control", "no-cache"); // 针对的是非首页的

    // 如果浏览器访问我，我发现他上次的缓存的文件的内容 和现在的一样，直接去缓存中找 304
    //  为了兼容老版浏览器

    // 1) 你的浏览器会访问我 最后的修改时间  8：00
    // 如果你在访问我 还是8:00 文件没改过 返回 304

    // 如果你在访问我 还是8:01 
    // Last-Modified if-modified-since
    // 缺陷 就是可能时间变了 内容没更改 如果1秒内改了2次
    // let lastModified = statObj.ctime.toGMTString()
    // res.setHeader('Last-Modified',lastModified);
    // let ifModifiedSince = req.headers['if-modified-since'];
    // if(ifModifiedSince ===lastModified ) { // 对比最后的修改时间
    //     res.statusCode = 304
    //     return res.end();
    // }
    let buffer = await fs.readFile(filePath);
    let md5 = crypto.createHash('md5').update(buffer).digest('base64')
    res.setHeader('Etag',md5);
    
    let ifNoneMatch = req.headers['if-none-match'];
    if(ifNoneMatch === md5){
        
    }
    // Etag指纹 指纹 文件的大小 文件大小 + 最后修改时间
  }
  async sendFile(filePath, req, res,statObj) {
     
    if(this.cache(filePath, req, res,statObj)){
        res.statusCode = 304
        return res.end();
    }
    res.setHeader("Expires",new Date(Date.now()+10*1000).toGMTString())
    res.setHeader("Content-Type", mime.getType(filePath) + ";charset=utf-8");
    createReadStream(filePath).pipe(res);
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