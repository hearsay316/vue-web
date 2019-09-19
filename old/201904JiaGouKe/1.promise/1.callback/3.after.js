// lodash after  在（调用）多少次之后
function after(times,callback){
    return function(){
        if(--times === 0){
            callback();
        }
    }
}
function say(){
    console.log('say');
}
let newSay = after(3,say); // 这是一个闭包 你不知道js 上
newSay();
newSay();
newSay();