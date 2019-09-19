// 存储
// localstorage sessionStorage cookie-session
 浏览器localstorage (跨域吗？大小限制 5M) sessionStorage(浏览器关闭后就清除) 不支持传输

// http无状态的 cookie 做登录 / jwt json web token
// session 是服务器上的  cookie 服务器和客户端端都能设置 
// session 是基于cookie的 （如果什么都放到cookie上 可能占用流量 需要合理设置cookie）
// http header 默认 4k


// cache api  indexDB