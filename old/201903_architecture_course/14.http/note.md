## 响应状态码 （服务端）
- 200 成功 204 没有响应体成功 206
- 301 永久重定向 302 临时重定向 304 缓存 （http有哪些缓存）
- 401 没有登录 403 登录了还是没权限 404
- 500 502

## 请求的方法(常见)
- restful API  / graphQL
- 根据方法和路径名对数据进行操作
- get post put delete options

- get /user 表示获取用户
- post /user 增加用户
- put /user 修改用户
- delete /user 删除用户

- options跨域 什么时候会发送

简单请求 get post （如果传递了一些复杂的头信息 a:1）如果跨域的时候发送的是复杂请求 先发送一个options请求 预检

## 头信息 (http-headers)
- 内置请求头 ，自定义头
- Accept允许接受的数据类型
- Accept-Encoding 支持哪些压缩格式
- Accept-Language 支持哪些语言
- Cache-Control:缓存控制
- Connection 长链接
- Cookie 会话信息
- Host 网站的主机名
- Referer 来源 （安全 防盗链）
- Upgrade-Insecure-Requests 升级
- User-Agent: 用户内核
- Accept-Ranges 实现范围请求

> 发请求 1） 直接通过浏览器 2) 命令行 curl postman  3) 可以自己写一个客户端(node中间层) 我们请求node服务器 -> java服务器 (为了做跨域，格式化数据) 服务端是没有跨域的问题，实现前后端分离 ，跨域机制是浏览的

## 请求 （客户端 浏览器）响应 (服务器)
- 用户的请求信息处理

## url 
- 数据分布
http://username:password@locahost:3000/pathname?query=1#hash