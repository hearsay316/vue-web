// gzip deflate

// Accept-Encoding: gzip, deflate

let zlib = require('zlib');
let fs = require('fs');
let path = require('path');
// fs.readFile createReadStream

let file = fs.readFileSync(path.join(__dirname,'1.txt'))
zlib.gzip(file,function(err,result){ // html css 开启gzip压缩
    fs.writeFileSync('1.gz',result); // 1*10000w1
})
// 解压
zlib.unzip('1.gz',function(err,result){

});

// http 客户端会和我说 我支持什么方式来压缩
// 服务器 可以用这个方式来压缩 并且告诉客户端

