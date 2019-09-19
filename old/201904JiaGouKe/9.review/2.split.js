// buffer 非常像数组 forEach
// buffer的大小不能随意更改

// 自己实现图片上传 字段之间的分隔符是固定

// 编码的问题 utf8 3个 gbk gb2312 2
let buffer = Buffer.from('欢迎你好欢迎你好欢迎')
// let r = buffer.indexOf("你好",15);
Buffer.prototype.split = function(sep){
    let arr = [];
    let len = Buffer.from(sep).length;
    let currentPosition;
    let offset = 0;
    while(-1!=(currentPosition = this.indexOf(sep,offset))){
        arr.push(this.slice(offset,currentPosition));
        offset = currentPosition +len;
    }
    arr.push(this.slice(offset));
    return arr;
}
console.log(buffer.split('你好'));