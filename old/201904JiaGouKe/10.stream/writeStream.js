let EventEmitter = require('events');
let fs= require('fs');
class WriteStream extends EventEmitter{
    constructor(path,options){
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || 'utf8';
        this.mode = options.mode || 0o666;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 16*1024;
        this.open(); // 异步的
        this.len = 0; // 维护写入的总个数
        this.writing = false; // 如果往文件中写入需要把这个值改成true
        this.cache = [];
        this.position = this.start;
        this.needDrain = false; // 不触发drain事件
    }
    /**
     * chunk 要写入的内容
     * encoding 要写入的编码
     * callback 成功的毁掉
     */
    write(chunk,encoding,callback){
        chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk);
        this.len +=chunk.length;
        let r = this.len <  this.highWaterMark;
        this.needDrain = !r;
        if(this.writing){
            this.cache.push({
                chunk,
                encoding,
                callback
            })
        }else{
            this.writing = true; // 标识一下正在写入
            this._write(chunk,encoding,callback); // 真正的像文件中写入
        }
        return r;
    }
    clearBuffer(){
        let obj = this.cache.shift();
        if(obj){
            this._write(obj.chunk,obj.encoding,obj.callback);
        }else{
            if(this.needDrain){
                this.writing = false;
                this.emit('drain');
            }
        }
    }
    _write(chunk,encoding="utf8",callback=()=>{}){
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>this._write(chunk,encoding,callback));
        }
        fs.write(this.fd,chunk,0,chunk.length,this.position,(err,written)=>{
            this.position += written; // 偏移量增加
            this.len -= written; // 让缓存区减少
            callback();// 表示当前写入成功了
            this.clearBuffer();// 清空缓存
        });
    }
    open(){
        fs.open(this.path,this.flags,(err,fd)=>{
            if(err){

            }
            this.fd = fd;
            this.emit('open',fd);
        })
    }
}
module.exports = WriteStream