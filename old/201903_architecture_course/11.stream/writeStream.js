let EventEmitter = require('events');
let fs = require('fs');
class WriteStream extends EventEmitter{
    constructor(path,options){
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.highWaterMark= options.highWaterMark || 16*1024;
        this.open(); // 打开文件
        this.cache = []; // 缓存列表 存放多次write的方法的
        // 需要维护一个写入的总长度
        this.len = 0;
        this.needDrain =false; // 是否触发drain事件
        this.offset = this.start;
        this.writing = false;
    }
    write(chunk,encoding,callback){
        // 强制把写入的内容转化成buffer类型
        chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk);
        this.len+=chunk.length;
        let ret =  this.len <= this.highWaterMark
        this.needDrain = !ret; // 如果当前写入的内容超过了预计的大小 需要触发drain事件
        if(this.writing){
            this.cache.push({
                chunk,
                encoding,
                callback
            })
        }else{
            this.writing = true;
            this._write(chunk,encoding,()=>{
                callback();
                this.clearBuffer();
            }); // 内部write方法 真正的像文件中写入
        }
        return ret;
    }
    clearBuffer(){
        // 将缓存一个个拿出来依次执行
        let obj = this.cache.shift();
        if(obj){
            this._write(obj.chunk,obj.encoding,()=>{obj.callback();this.clearBuffer()})
        }else{
            if(this.needDrain){
                this.needDrain = false;
                this.writing = false; // 像文件中写入的 缓存中的都清空了 下次再调用write方法时 在继续像文件中写入
                this.emit('drain')
            }
        }
    }
    _write(chunk,encoding,callback){
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>this._write(chunk,encoding,callback))
        }else{
            fs.write(this.fd,chunk,0,chunk.length,this.offset,(err,written)=>{
                this.offset += written; // 写入后增加长度
                this.len -= written;
                // 清空cache中的内容
                callback(); // 第一个写完了 会先触发自己的方法
            });
        }
    }
    open(){
        fs.open(this.path,this.flags,(err,fd)=>{
            if(err){return console.log(err)}
            this.fd = fd;
            this.emit('open',this.fd);
        });
    }
}

module.exports = WriteStream;


// 周日 作业：  读流 + 写流  pipe
// http api  http头 范围请求  防盗链 多语言 压缩gzip 虚拟主机 反向代理 node中间层-> http => npm 
// koa ->  express(原理) 