let fs = require('fs');
// 发布订阅  发布   订阅
let e = {
    arr:[],
    obj:{},
    // i:0,
    // setTime(times){
    //     this.i = times;
    // },
    on(fn){ // 发布订阅模式 订阅和发布完全无关
        this.arr.push(fn);
    },
    emit(key,value){
        this.obj[key] = value;
        //if(this.i === Object.keys(this.obj).length){
        this.arr.forEach(fn=>fn(this.obj));
        //}
    }
}
// e.setTime(2);
e.on(function(obj){ // [fn,fn]
    if(Object.keys(obj).length === 2){
        console.log(obj);
    }
})
e.on(function(obj){
    console.log('获取了所有数据');
});
fs.readFile('./name.txt','utf8',function(err,name){ // 5s
    e.emit('name',name);
});
fs.readFile('./age.txt','utf8',function(err,age){ // 15s
    e.emit('age',age);
});

// 姜文 1035465284

