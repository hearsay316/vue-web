// 多语言  网站拆分成 多个网站 /zh-cn  /en  前端

// accept-language: zh-CN,zh;q=0.9,en;q=0.8 我当前客户端支持什么语言
// 前端搞一个按钮 

// [{name:'zc-CN',q:1},{name:'zc-CN',q:1},{name:'zc-CN',q:1}]
let http = require('http');

let language = {
    en:"hello",
    'zh-CN':"你好",
    'jp':'xxxxx'
}
let defaultLanguage = 'en';
http.createServer((req,res)=>{
    let languages = req.headers['accept-language'];
    if(languages){
        let lans = languages.split(',').map(lan=>{
            let [l,q='q=1'] = lan.split(';');
            let obj = {};
            obj['name'] = l;
            obj['q'] = q.split('=')[1];
            return obj
        }).sort((a,b)=>b.q-a.q); // 根据不同的语言进行排序 ，拿到语言包的列表
        let current = lans.find(item=>{ // 去看支持哪种语言，返回对应的结果， webpack-loader i8nss
            let name = item.name;
            return language[name]
        });
        if(!current) return res.end(language[defaultLanguage]);
        res.end(language[current.name]);
    }else{
        let r = language[defaultLanguage];
        res.end(r);
    }
}).listen(3000);