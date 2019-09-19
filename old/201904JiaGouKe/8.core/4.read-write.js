// fs.read  fs.write

const fs = require("fs");
const BUFFER_SIZE = 3; // [1,2,3,4,5]
const buffer = Buffer.alloc(BUFFER_SIZE);

// 16进制 31  49 50
// ascii  127以内都是ascii
// gb2312 -> gb18030 -> gbk
// unincode
// utf8
fs.open("./1.txt", "r", function(err, rfd) {
  // fd 是一个数字类型
  // mode 权限 7（针对的是自己） 7（当前我所属于的组） 7（其他组的）  2 读取,4 写入,1 执行
  fs.open("./2.txt", "w", (err, wfd) => {
    // fd 文件描述符 代表的就是这个打开的文件
    // buffer 把读取的内容写入到哪个buffer中
    // 从buffer的哪个位置开始写入,
    // 读取的个数
    // 文件读取的位置
    // bytesRead 读取到的个数
    let readPosition = 0; // co
    function next() {
      fs.read(rfd, buffer, 0, BUFFER_SIZE, readPosition, function(
        err,
        bytesRead
      ) {
        readPosition += bytesRead;
        fs.write(wfd, buffer, 0, bytesRead, function(err, written) {
          if (bytesRead != 0) {
            next();
          } else {
            fs.close(rfd, () => {});
            fs.close(wfd, () => {});
          }
        });
      });
    }
    next();
  });
});
// 流 可以把这个代码直接封装到内部