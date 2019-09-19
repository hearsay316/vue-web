let fs = require('fs');
let EventEmitter = require('events')
class ReadStream extends EventEmitter{
    constructor(path,options = {}){
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || undefined;
        this.start = options.start || 0;
        this.end = options.end || undefined;
        this.highWaterMark = options.highWaterMark || 64*1024;
        // 先去把文件打开
        this.open();
        this.flowing = null; // 默认是暂停模式
        // 如果用户监听了on('data')事件 emit('data',xxx)
        this.on('newListener',(type)=>{
            if(type === 'data'){
                this.flowing = true;
                this.read(); // 开始读取文件
                // 用户监听了 data事件，内部应该开始读取了
            }
        });
        
        this.offset = this.start; // 默认的便宜量和开始的位置是相同
    }  
    pause(){
        this.flowing = false;
    }
    read(){
        if(typeof this.fd !== 'number'){
            // 如果fd不存在 就绑定open事件，如果稍后触发了open事件会执行此回调，这个回调会再去调用read方法
            this.once('open',()=>this.read());
        }else{
            let buffer = Buffer.alloc(this.highWaterMark);
            // 我需要算一下当前 应该读取多少个
            // 0   100   每次读取两个  每次的偏移量
            // 01  2
            let howMuchToRead = this.end? Math.min((this.end - this.offset+1),this.highWaterMark) : this.highWaterMark
            fs.read(this.fd,buffer,0,howMuchToRead,this.offset,(err,bytesRead)=>{
                if(this.flowing){
                    if(bytesRead){
                        this.offset+= bytesRead;
                        this.emit('data',this.encoding?buffer.slice(0,bytesRead).toString(this.encoding):buffer.slice(0,bytesRead));
                        this.read(); // 如果能读取到就在继续读取
                     }else{
                        // 如果没法读取了
                        this.emit('end');
                        fs.close(this.fd,()=>{
                            this.emit('close');
                        })
                     }
                }
            })
        }
    }
    open(){
        fs.open(this.path,this.flags,(err,fd)=>{
            if(err){
                return this.emit('error',err)
            }
            this.fd = fd;// 保存文件的描述符
            this.emit('open',fd);
            // 触发open事件
        })
    } 
    pipe(ws){
        this.on('data',(data)=>{
           let flag =  ws.write(data);
           if(!flag){
               this.pause();
           }
        })
        ws.on('drain',()=>{
            this.resume();
        })
        this.on('end',()=>{
          ; // 关闭文件
            
        })
    }
}

module.exports = ReadStream;