let x = "hello";
console.log(x.toLocaleLowerCase());
// 基本类型没有方法
//  他是有一个自动化装箱的过程

//  他内部是一个包装
console.log(new String(x).charAt(0));
let znamezhufeng :string|null|number;
//console.log((znamezhufeng as string).toLocaleLowerCase());
let named:1|2|36|"ii" = 1;
/**
 * 1 函数定义
 * */
function hello(x:number):string {
     return "hello"+x
}
/**
 * 1 函数表达式
 * 
 * */
type GetFunction = (x:number,y:string)=>void;
let getUserName:GetFunction = function (first:number,lastname:string):void {
    
}

// 可选参数
function print(name:string, age?:number) :string {
    return "sss"
}

print("xasds");


// 默认参数
function print2(name:string, age:number=555) :string {
    return "sss"
}

print2("xsd");
function sum(...umbers:Array<number>) {
    console.log(umbers)
}
sum(1,2,3,6,5,8,8);


// 函数的重载
// 在java中重载是两个函数名字一样,参数不一样
//  在ts中  仅仅是一个函数提供很多函数定义
