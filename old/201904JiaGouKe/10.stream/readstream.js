let fs = require('fs');
let EventEmitter = require('events');
class ReadStream extends EventEmitter{
    constructor(path,options = {}){
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.autoClose = options.autoClose || true;
        this.start = options.start; // 0
        this.end = options.end;
        this.fd = options.fd;
        this.highWaterMark = options.highWaterMark || 64*1024
        // 开启文件
        if(!this.fd){
            this.open();
        }

        this.flowing = null; // 默认是非流动模式
        this.finish = false;
        this.position = this.start; // 读取的偏移量
        // 用户监听了data事件就开始读取
        this.on('newListener',(type)=>{
            if(type === 'data'){
                this.flowing = true;
                this.read();// 开始读取
            }
        });
    }
    pause(){
        this.flowing = false; // 控制读取是否暂停
    }
    resume(){
        if(this.finish){
            return;
        }
        this.flowing = true;
        this.read();
    }
    pipe(ws){
        this.on('data',(data)=>{ // data.length
            let flag = ws.write(data);
            if(!flag){
                this.pause();
            }
        })
        
        ws.on('drain',()=>{
            this.resume();
        })
    }
    read(){ // 我希望处理异步的逻辑 按顺序执行，等待open执行后 再去读取数据
        if(typeof this.fd != 'number'){
            // 发布订阅模式
            return this.once('open',()=>this.read());
        }
        // 每次读取后 我都需要将这个buffer发射出去,而且都是产生一个新的内存，不能复用，如果复用那最后的结果会只剩下最后一个
        // 如果当前距离结束 小于highWaterMark 读取少的
        let howMuchToRead = this.end?Math.min(this.end - this.position+1,this.highWaterMark)  :this.highWaterMark;
        let buffer = Buffer.alloc(howMuchToRead); // 4
        
        // 0 把读取到内容写入到buffer的第0个位置
        fs.read(this.fd,buffer,0,howMuchToRead,this.position,(err,bytesRead)=>{
            this.position += bytesRead;
            this.emit('data',buffer.slice(0,bytesRead));
            // 如果最后一次读取的个数小于highWaterMark
            // 如果读取的格式和hightWater相等 在去读取一次

            // 如果是流动模式我在继续读取
            if(bytesRead == this.highWaterMark){
                if( this.flowing){
                    this.read();
                }
            }else{
                this.emit('end');
                this.finish  = true;
                if(this.autoClose){
                    fs.close(this.fd,()=>{
                        this.emit('close');
                    })
                }
            }
        })
    }
    open(){ // 宏任务
        fs.open(this.path,this.flags,(err,fd)=>{
            if(err){
                console.log(err);
            }
            this.fd = fd;
            this.emit('open',fd)
        });
    }

}
module.exports = ReadStream