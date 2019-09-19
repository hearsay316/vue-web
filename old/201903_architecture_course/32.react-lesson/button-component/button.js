// 是否需要批量更新
let isBatching = { // 对象里面描述更新的状态
    isBatchingUpdate:false, // 默认不是批量更新
    dirtyComponents:[], // 如果父组件更新 
    batchingUpdate(){ // 批量更新的方法
        this.dirtyComponents.forEach(component => {
            component.updateComponent(); // 依次让组件更新
        });
    }
}
// 更新器 存储当前的需要更新的组件 和需要更新的状态
class Updater{
    constructor(component){ // 互相指向 ，每一个组件都有一个更新器，每个更新器中都存放着一个组件
        this.component = component;
        this.pendingStates = []; // 只是存放着状态的一个队列
        // [{number:1},{number:1}]
    }
    addState(newState){
        this.pendingStates.push(newState);
        // 刚才我调用setstate的时候
        if(isBatching.isBatchingUpdate){
            //如果dirtyComponent中已经存了当前的组件 就不要在放了
            isBatching.dirtyComponents.push(this.component);
        }else{
            this.component.updateComponent();
        }
    }
}
class Transaction {
  constructor(wrappers){
    this.wrappers = wrappers;
  }
  perfom(anyfunc){
    this.wrappers.forEach(wrapper => {
      wrapper.initailize();
    });
    anyfunc();
    this.wrappers.forEach(wrapper => {
        wrapper.close();
    });
  }
}
let transaction = new Transaction([
  {
    initailize(){
      isBatching.isBatchingUpdate = true;
    },
    close(){
      isBatching.isBatchingUpdate = false; // 批量更新结束
      // 去更新
      isBatching.batchingUpdate(); // 如果函数执行完后需要更新视图 （更新操作）
    }
  }
])
window.fn = function(e,eventName){
    // 当函数调用之前需要开启批量更新模式
    // 我需要将button组件 和这个 元素绑定起来
    // AOP 面向切片
    transaction.perfom(e.target.componet[eventName].bind(e.target.componet));
   
}
// 每一个组件都要一个更新器  , this
class Component {
   constructor(){
    this.$updater = new Updater(this);
  }
  // 创建dom元素 从字符串产生
  createDOMFromStr() {
    // 生成一个div
    let str = this.render();
    let div = document.createElement("div");
    div.innerHTML = str;
    this.ele = div.firstElementChild;
    this.ele.componet = this; // 把当前组件的实例存到这个dom元素上
    return this.ele;
  }
  updateComponent(){
      // 更新操作
    this.$updater.pendingStates.forEach((newState)=>{
        // [{number:1},{number:1}]
        this.state = {...this.state,...newState}
    })
    this.$updater.pendingStates.length = 0; // 清空上一次的缓存的状态
    let oldElement = this.ele;
    let newElement = this.createDOMFromStr();
    oldElement.parentElement.replaceChild(newElement, oldElement);
  }
  setState(partial) {
    // 设置状态 并且更新视图
    // this.state = { ...this.state, ...partial };
    this.$updater.addState(partial);
  }
  mount(container){
    container.appendChild(this.createDOMFromStr());
  }
}
class Button extends Component {
  constructor(props) {
    super(); // super中的this子类 Parent.call(this);
    this.props = props;
    this.state = { number: 0, age: 10 };
  }
  handleClick() {
    // 批量处理 不保证同步执行
    // 如果掉了setState  需要批量更新 会把需要更新的组件先缓存起来，状态也缓存起来
    // 如果不需要批量更新 直接更新组件即可

    // 是批量更新
    this.setState({ number: this.state.number +1 });
    console.log(this.state.number)
    this.setState({ number: this.state.number +1 });
    console.log(this.state.number)
    setTimeout(()=>{ // 非批量更新
        this.setState({ number: this.state.number +1 });
        console.log(this.state.number)
        this.setState({ number: this.state.number +1 });
        console.log(this.state.number)
    },3000)
  }
  render() {
    // 把字符串转化成dom元素
    return `<button onclick="fn(event,'handleClick')">${this.props.name} <span>${this.state.number}</span></button>`
  }
}
