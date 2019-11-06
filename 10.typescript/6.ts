// class 类
class Person{
    name1: string | undefined;
    getName():void{
        console.log(this.name1)
    }
}
interface calue {
    <M>(a:M):M
}
let add: calue =function (app) {
    return app;
}
add(6)
export {}
