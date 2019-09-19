class Animal{
    //static a =1; // es7的语法
    static a(){
        return 1
    }
    constructor(type){
        this.type = type;
    }
    say(){
        console.log('说话',this);
    }
} 
Animal();
// es6中提供了 静态方法 没有静态属性
let animal = new Animal('哺乳类');
console.log(Animal.a());
// let fn = animal.say // 错误的
// fn();
// 如果方法直接被调用 返回这个类的实例

// es6 -> es5
// babel 翻译官 默认可以转化代码 插件包 
// @babel/cli @babel/core => @babel/preset-env
// npm 5.2 以上 npx babel