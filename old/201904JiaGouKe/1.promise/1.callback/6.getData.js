// 观察者模式 vue 典型的观察者 发布订阅
// 观察者模式 > 发布 订阅
// 区别：发布订阅 发布和订阅是无关的
// 观察者 和被观察者肯定是有关系的
class Subject{ // 被观察者 我家宝宝
    constructor(){
        this.observers = [];
        this.state = '开心的'
    }
    attach(o){ // 注册观察者
        this.observers.push(o);
    }
    setState(newState){
        this.state = newState;
        this.observers.forEach(o=>o.update(newState))
    }
}
class Observer{ // 我
    constructor(name){
        this.name = name;
    }
    update(newState){
        console.log(this.name + ':' + '小宝宝最新的状态是'+newState);
    }
}
let o1 = new Observer('我');
let o2 = new Observer('妈妈');
let s = new Subject('小宝宝');
s.attach(o1);
s.attach(o2);
s.setState('不开心');
s.setState('开心')