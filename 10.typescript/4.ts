/**
 * 永远没有不知道什么类型
 * 一个函数永远不会返回就是 never
 * */

function add() :never{
    while(true){}
}
/**
 * 如果一个函数他的要抛出错误,那么他永远不会有返回值,所以函数类型是never
 * never 不能返回unll,undfined
 *
 * */
function minis() :never{
    throw new Error("xwsdwsd")
}
function double (x:number|string) {
    if(typeof x==="number"){
        console.log(x)
    }else if(typeof x === "string"){
        console.log(x)
    }else{
        console.log(x)
    }
}
