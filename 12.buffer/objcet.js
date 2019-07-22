function Age() {
    let age = 1;
    this.getAge=()=>{
        return age;
    };
    this.setAge = (newAge)=>{
        console.log(newAge);
    };
}
Age.getAge=()=>{
    return age;
};
Age.setAge = (newAge)=>{
   console.log(newAge);
};
Age.prototype.user = function(){

    console.log(this);
};
Age.setAge(333);


let a = new Age();
console.log(a.user());
a.setAge(56);
/*
console.log(a.getAge());
let b = new Age();
console.log(b.getAge());
b.user();*/
