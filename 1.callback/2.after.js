// lodash


function after(times,callback){ // 满足一点就是高阶函数
    return function(){ // promise.all
        if(--times===0){
            callback();
        }
    }
}

let newFn = after(3, function () { //高阶函数
    console.log("after");
    }
);
newFn();
newFn();
newFn();
