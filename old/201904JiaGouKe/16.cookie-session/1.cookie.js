let http = require('http');
let querystring = require('querystring');
let crypto = require('crypto');

http.createServer(function(req,res){
    let sign = (value)=>{
        return crypto.createHmac('sha256','zf').update(value.toString()).digest('base64')
    }
    res.getCookie = function getCookie(key,{signedCookie}){
        let cookies = querystring.parse(req.headers.cookie,'; ');
        if(signedCookie){ // 如果内容签名了 我需要核实一下内容是否可靠
            let [value,signStr] = cookies[key].split('.')
            let s = sign([value]);
            if(s === signStr){
                return value;
            }else{
                return '';
            }
        }
        return cookies[key] || '';
    }
    let cookiesArr = [];
    res.setCookie = function(key,value,options={}){
        let optionArgs = []
        if(options.domain){
            optionArgs.push(`domain=${options.domain}`)
        }
        if(options.path){
            optionArgs.push(`path=${options.path}`)
        }
        if(options.httpOnly){
            optionArgs.push(`httpOnly=true`)
        }
        if(options.signedCookie){
            value = value+'.'+ sign(value);
        }
        cookiesArr.push(`${key}=${value}; ${optionArgs.join('; ')}`);
        res.setHeader('Set-Cookie',cookiesArr)
    }
    // cookie不能跨域设置，携带凭证
    // 读取cookie  如果超过最大存活时间会自动销毁
    if(req.url === '/read'){
        // name=zf; age=10  => {name:zf,age:10}
        console.log(req.headers.cookie)
        let age = res.getCookie('age',{signedCookie:true});
        res.end(age.toString());
        //res.end(JSON.stringify(querystring.parse(req.headers.cookie,'; ')));
    }
    // 设置cookie
    if(req.url === '/write'){ //www.baidu.com music.baidu.com  => .baidu.com
        // domain 只能在某个域名下设置cookie
        // path / 以开头的就可以获取到 
        // max-age expires 设置缓存
        // res.setHeader('Set-Cookie',[
        //     'name=zf; domain=.zf.cn',
        //     'age=10; max-age=10'
        // ]);
        // httpOnly 保证cookie不能再浏览器端获取，但是依然可以伪造
        res.setCookie('name','jw.zxcvzxcx',{httpOnly:true}); // md5
        res.setCookie('age',10,{signedCookie:true});
        res.end('ok');
    }
    res.end('路径有误');
}).listen(3000);
// 有一个秘钥 ，这个秘钥只有我有，如果用户改了cookie 

// 加盐
// 
// let r = crypto.createHmac('sha256','zf1').update('hello').digest('base64');
// console.log(r);
