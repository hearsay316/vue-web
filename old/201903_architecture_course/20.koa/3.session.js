let http = require('http');
let querystring = require('querystring');
let uuid = require('uuid');
// 1) 第一次请求服务器 办一张卡 店铺的名字  店铺的卡号
let SEESSION_NAME = 'connect.sid'; // 店铺的名字 
let session = {}; // 重启服务 会导致数据丢失 不方便同步信息
// session -》 redis 键值对 "xvxvcxcv":"{}" 
// 前后端同构项目 前后端不分离的  在前端里可以拿到session nuxtjs
// 前后端分离  jwt token
http.createServer((req,res)=>{
    // 解析用的cookie对象
    let userCookieObj = querystring.parse(req.headers['cookie']);
    // 取到客户的卡号 
    let cardId = userCookieObj[SEESSION_NAME]
    // 有可能有卡号，但是找不到对应关系
    if(cardId && session[cardId]){
        session[cardId].mny -= 10;
        res.setHeader('Content-Type','text/html;charset=utf8');
        res.end(`现在有${session[cardId].mny}`)
    }else{
        // 第一次我需要发一张卡
        let cardId = uuid.v4();
        session[cardId] = {
            mny:100
        }
        // 需要签名 并且不能客户端随意篡改
        res.setHeader('Set-Cookie',`${SEESSION_NAME}=${cardId}`);
        res.end(`当前是第一次来 给你冲100块`)
    }
    
}).listen(3000);