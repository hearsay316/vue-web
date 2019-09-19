let http = require('http');
let querystring = require('querystring');
let uuid = require('uuid');
// 我去洗澡店消费
let session = {}; // 更安全的 可以存储用户的状态
// 怎么证明是第一次来
// 我先给店铺起个名
let shopName = 'zf';
// 用户的信息 用户的名 做一个关联
http.createServer((req,res)=>{
    // 可能有卡号 但是店铺黄了 
    if(req.url === '/'){
        let value = querystring.parse(req.headers['cookie'],'; ')[shopName]
        if(value && session[value]){
            // 第二次来
            session[value].mny -= 10;
            res.end('current money is '+session[value].mny)
        }else{
            // 第一次
            let cardId = uuid.v4();
            res.setHeader('Set-Cookie',`${shopName}=${cardId}`);
            session[cardId] = {mny:100};
            res.end('weclome current money is '+ session[cardId].mny)
        }
    }
  
}).listen(3000);
// 实现一个注册登录 jwt  koajs