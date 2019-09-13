console.log(Object.keys(global));
// Buffer 为了node能处理二进制 buffer可以和字符串任意转换 

// 进制转化的问题 
// 编码 1个汉字 有几个字节  utf8 (3个字节)  gbk 2个字符串
// ASCII 1个字节表示 字母 127个字符来表示出了 美国人所有的内容  十进制
// 1个字节 是由8个位组成
// 十进制和二进制的转化  11111111 二进制中最大的位的值就是1 一个字母 只占用一个字节
// GB2312  2字节  超过 127 我就认为是 汉字 (247-161)*(254-161)=(7998)
// GB18030 编码 (247-161)*255 
// unicode 编码 可变的 没推行
// utf8; 3个字节表示、

// 2进制转化成16进制 作为buffer

let buf = Buffer.from('珠峰');

// 怎么把 16进制转化 成10进制


// 把 任意进制转化成10进制

console.log((125).toString(16));
// 把 2进制转化成10进制 
console.log(parseInt('11111111','2'));


// base64 所有的路径 都可以用base64替换 fileReader
// base64的大小会比以前大 1/3
// base64 只是一种编码  并不能加密
// md5 摘要算法

//一个汉字 3个字节 * 8个位 = base64 6 * 4

console.log(Buffer.from('珠')); // e7 8f a0
// 0b  10  020  0x
console.log((0xe7).toString(2))
console.log((0x8f).toString(2))
console.log((0xa0).toString(2))
//11100111   10001111   10100000

// 111001  111000  111110  100000  =>  在转化成 10进制

console.log(parseInt('00111001',2));
console.log(parseInt('00111000',2));
console.log(parseInt('00111110',2));
console.log(parseInt('00100000',2));

// 57 56 62 32

let str = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
str+= 'abcdefghijklmnopqrstuvwxyz'
str+= '0123456789+/';
console.log(str[57] + str[56] + str[62] + str[32]); // 54+g


// 图片的base64 还有自己的规则 
console.log(Buffer.from('珠').toString('base64'))

// 浏览器的事件环 node事件环 微任务 和 宏任务 promise 知道执行的顺序流程
// global 常用属性
// commonjs规范  三种模块 核心 文件 第三方
// 核心模块 fs path events util 
// 进制转化 0.1 + 0.2 != 0.3?

// 如何将小数转换成 二进制  乘2取整法 
// 0.1 * 2 = 0.2 0
// 0.2 * 2 = 0.4 0
// 0.4 * 2 = 0.8 0
// 0.8 * 2 = 1.6 1
// 0.6 * 2 = 1.2 1
// 0.2 * 2 = 0.4 0  // 0.000110011001100110011
 

//                  0.0001100110011001100110011001100110011001100110011001101
//                  0.001100110011001100110011001100110011001100110011001101

//  111

// buffer fs  npm 的应用  流 周末 http

// 1035465284