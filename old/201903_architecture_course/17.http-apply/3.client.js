let http = require('http');
let limit = 4;
let start = 0;
let fs = require('fs')
// 当用户输入 p 标示暂停   输入r的时候 表示恢复
let flowing = true;
process.stdin.on('data',function(data){
    if(data.toString().includes('p')){
        flowing = false;
    }else if(data.toString().includes('r')){
        flowing = true;
        downLoad();
    }
})
let ws = fs.createWriteStream('xxxxx.txt')
function downLoad(){
    http.get({
        hostname:'localhost',
        port:3000,
        headers:{
            Range:`bytes=${start}-${start+limit}`
        }
    },function(res){
        let total = res.headers['content-range'].split('/')[1];
        res.pipe(ws,{end:false});
        start = start+1+limit;
        if(total >= start && flowing){
            setTimeout(() => {
                downLoad();
            }, 1000);
        }
    });
}
downLoad();



