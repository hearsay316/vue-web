let fs = require('fs');

let rs = fs.createReadStream('./name.txt',{highWaterMark:4}); 
let {Readable} = require('stream')
// ReadStream 他继承了我们的Readable接口
// ReadStream => this.read()
// read方法是父类的Readable方法
// Readable会调用子类的ReadStream _read
// 子类调用父类的push方法，把数据放进去，内部会自动将读取的数据发射出来

// 自己实现一个自己的可读流

class MyReadStream extends Readable{
    _read(){ // 重写读取的方法，父类会自动调用
       let data =  fs.readFileSync('./age.txt','utf8');
       this.push(data); // 内部会触发emit('data')事件
       this.push(null); // emit('end')
    }
}
let mrs = new MyReadStream();
mrs.on('data',(data)=>{
    console.log(data);
});
mrs.on('end',()=>{
    console.log('end')
})