let fs = require('fs');
let {Writable} = require('stream');
let ws = fs.createWriteStream('./name.txt',{highWaterMark:4}); 



// 我们的可写流 会继承 Writable接口 write()
//  write方法会触发子类的_write()


class MyWriteStream extends Writable{
    _write(data,encoding,clearBuffer){ // 写的时候 写入完毕后需要调用清空内存的方法
        console.log(data);
        fs.appendFileSync('./name.txt',data);
        clearBuffer();
    }
}

let mws = new MyWriteStream();
mws.write('123');
mws.write('123');
mws.write('123');
mws.write('123');

// on('data') 可读流
// write end 
// 双工流