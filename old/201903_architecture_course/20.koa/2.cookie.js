// localstorage sessionStorage cookie session 的区别  
// session只能在服务端使用

// localstorage 5m 清空销毁 sessionStorage 关闭浏览器销毁 浏览器中
// 不能跨域

// cookie通过浏览器设置 ，每次请求服务器会带上cookie  用户的一些信息
// http无状态

// 安全性问题  xss攻击 innetHTML 输入框里的内容都需要校验 
// 做一个假网页 -》 真的网站

let http = require('http');
let querystring = require('querystring');
let crypto = require('crypto');
// openssl 生成一个 1k大的密钥
// let r = crypto.createHmac('sha256','jw2').update('hello').digest('base64');
// console.log(r);
//二级域名 www.baidu.com tieba.baidu.com 不能跨域设置
function generator(value){
    return crypto.createHmac('sha256','xxx').update(value+'').digest('base64'); // 会把 特殊符号 就给丢失了
}

http.createServer((req,res)=>{
    res.cookies = {
        _arr:[],
        set(key,value,options={}){
            let arr = [];
            if(options.signed){
                value = value+'.'+ generator(value);
            }
            arr.push(`${key}=${value}`); // 'name=zf; domain=xxx.cn'
            if(options.domain){
                arr.push(`domain=${options.domain}`)
            }
            if(options.maxAge){
                arr.push(`max-age=${options.maxAge}`)
            }
            if(options.path){
                arr.push(`path=${options.path}`)
            }
            if(options.httpOnly){
                arr.push(`httpOnly=${options.httpOnly}`)
            }
            
            this._arr.push(arr.join('; '));
            res.setHeader('Set-Cookie',this._arr); // 用户可以设置多个cookie
        },
        get(key,options){
            if(!options){ // 1.AFxh4rnZK12Nhzl/g7CqZqDldRd/1X7MfPevK8d4704=
                let obj = querystring.parse(req.headers['cookie'],'; ') ||'';
                return obj[key]? obj[key].split('.')[0]:'' ;
            }else{
                // 判断
                let obj = querystring.parse(req.headers['cookie'],'; ') ||{};
                let [oldValue,sign] = obj[key].split('.')
                if(generator(oldValue) === sign){
                    return oldValue
                }else{
                    return '';
                }
            }
        }
    }
    if(req.url === '/visit'){ // 统计一下用户访问服务器的次数
        let count;
        if(!res.cookies.get('visit',{signed:true})){
            count = 1;
        }else{
            count = Number(res.cookies.get('visit')) + 1
        }
        res.cookies.set('visit',count,{signed:true}); // 加盐算法  
        res.setHeader('Content-Type','text/html;charset=utf8');
        res.end('亲 你是第'+count+'次访问的')
    }
    if(req.url === '/r/read'){
        res.end(res.cookies.get('name'))
    }
    if(req.url === '/r/write'){ // 默认路径是以上一级路径为准
        // domain 域名  设置域名 可以限制流量
        // path    一般是不设置的 可以设置哪个路径的开头下可以使用
        // httpOnly 如果为true 不能通过浏览器获取cookie 保证了cookie安全性  token 一般都放在cookie中
        // expires 绝对时间  GMTString max-age 相对时间 s
        res.cookies.set('name','zf',{maxAge:10,domain:'localhost'});
        res.cookies.set('age','19',{maxAge:10,domain:'localhost'});
        // res.setHeader('Set-Cookie',[
        //     'name=zf; domain=a.zhufeng.cn; path=/r; httpOnly=true; max-age=5',
        // ]); // 4k
        res.end('write ok');
    }
}).listen(3000);


// let querystring = require('querystring');

// console.log(querystring.parse('name=1; age=2','; '))