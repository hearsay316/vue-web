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
class Dog extends Animal{
    constructor(type){
        super(type); // Animcal.call(this,type);
    }
}
let dog = new Dog('狗狗');
console.log(Dog.a());