let url = require('url');
let str = `http://username:password@locahost:3000/pathname?query=1#hash`;
let obj = url.parse(str,true);
console.log(obj);

// host 有端口的  hostname
// query 用户传递的参数 / pathname 路径名


// http server 写一个服务端 写一个客服端 
// 常见的功能
// http-server 