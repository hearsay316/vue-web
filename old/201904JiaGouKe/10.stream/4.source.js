let fs = require('fs');

let w =fs.createWriteStream('1.txt');

w.write('123');

// 当前createReadStream 会继承Readable类
// 默认会调用父类的read方法，read方法会调用子类的_read
// 把读取的内容push进去 默认就会把结果emit出来


// createwriteStream  writable
// 父类的write方法 会调用子类_write =>fs.write()


