let http = require('http');
let uuid = require('uuid');
let fs = require('fs');
let path = require('path');
Buffer.prototype.split = function(sep){
    let len = Buffer.from(sep).length;
    let arr = [];
    let offset = 0;
    let current;
    while(-1!=(current=this.indexOf(sep,offset))){
        arr.push(this.slice(offset,current));
        offset = current + len;
    }
    arr.push(this.slice(offset));
    return arr;
}
// 二进制文件的解析
http.createServer((req,res)=>{
    if(req.url == '/upload' && req.method ==='POST'){
        let arr = [];
        req.on('data',(data)=>{
            arr.push(data);
        });
        req.on('end',function(){
            let boundary = '--'+req.headers['content-type'].split('=')[1];
            let buf = Buffer.concat(arr); // 这里面存放的就是所有提交的内容
            let lines = buf.split(boundary).slice(1,-1);
            let returnObj = {}
            lines.forEach(line => {
                let [h,body] = line.split('\r\n\r\n');
                head = h.toString();
                let key = head.match(/\bname="([\s\S]+?)"/)[1];
                if(head.includes('filename')){ // 文件
                    let start = h.length + 4;
                    let end = -2;
                    let fileContent = line.slice(start,end);
                    // 将内容写入到文件中 文件名不能重复 uuid 
                    let filename = uuid.v4(); // 产生文件名
                    let fileSize = fileContent.length;
                    let uploadDir = path.resolve(__dirname,'upload');
                    returnObj[key] = {
                        filename,
                        fileSize,
                        uploadDir
                    }
                    fs.writeFileSync(path.join(uploadDir,filename),fileContent);
                }else{ // 普通文本
                    returnObj[key] = body.slice(0,-2).toString();
                }
               // 最终返还的结果 {username:"123"}
            });
            res.end(JSON.stringify(returnObj));
        })
    }
}).listen(3000);