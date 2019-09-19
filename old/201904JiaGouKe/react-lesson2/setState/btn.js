let batchingUpdate = { // 批量更新 
    isBatchingUpdate:false, // 默认不是批量更新
    dirtyComponents:[],// 如果是批量更新 将当前组件存入到这个数组中   // 订阅
    update(){ // 遍历所有的dirtyComponents中的组件 依次刷新

        // 发布
        this.dirtyComponents.forEach(component=>{
            component.updateComponent();
        })
    }   
}
class Updater{ // 每一个组件我都对应一个 updater
    constructor() {
        this.pendingState = []; // 存放状态的
    }
}
class Component {
    constructor(){
        this.$updater = new Updater(); // 每个组件都有一个更新器
    }
    updateComponent(){ // 更新组件的方法
        // ----- 渲染视图
        let oldEle = this.oldEle; 
        // 把 当前的updater中的状态 更新到当前的组件上即可
        this.$updater.pendingState.forEach(partialState=>{  //[ {number10+1}, {number:10+1}]
           Object.assign(this.state,partialState)
        })
        let newEle = this.createDOMFromString(); // 渲染一个新的元素
        oldEle.parentElement.replaceChild(newEle,oldEle)
    }
    mount(container){
        container.appendChild(this.createDOMFromString())
    }
    createDOMFromString(){ // 这个方法会返回一个dom元素
        let str = this.render()
        let div = document.createElement('div');
        div.innerHTML = str;
        let ele =  div.firstElementChild;
        ele.component = this
        this.oldEle = ele; // 保存第一次渲染的结果
        return ele;
    }
    setState(partialState){
        this.$updater.pendingState.push(partialState);
        if(batchingUpdate.isBatchingUpdate){ // 如果当前组件是批量更新 那么直接将组件存起来
            batchingUpdate.dirtyComponents.push(this);
        }else{
            this.updateComponent();// 如果不是批量更新直接调用更新即可
        }
       // Object.assign(this.state,partialState); // 合并状态
   }
}
function fn(e,eventName){ // 事件转发，把当前的dom元素上绑定组件的实例 调用组件实例上的方法
    // e.target
    // 事件开始
    batchingUpdate.isBatchingUpdate = true;
    e.target.component[eventName].call( e.target.component);
    batchingUpdate.isBatchingUpdate = false;
    batchingUpdate.update(); // 批量更新结束之后 去调用更新组件的方法
    // 事件结束
}
class Btn extends Component{
    constructor(props) {
       super(props);
       this.props = props;
       this.state = {
           number:10
       }
    }
    handleClick(){ // setState 和异步没有任何关系 vm.$nextTick setTimeout Promise
        // 是否批量更新 如果是批量更新 不会马上将状态更新
        this.setState({
            number:this.state.number+1
        })
        this.setState({
            number:this.state.number+1
        });

        // 在定时器中的是处于非批量更新 每次调用setState 都会更新一下 
        window.setTimeout(()=>{
            this.setState({
                number:this.state.number+1
            })
            this.setState({
                number:this.state.number+1
            });
        },1000)
    }
    render(){
        return  `<button onclick="fn(event,'handleClick')">
            ${this.props.content} 
            <span>${this.state.number}</span>
        </button>`
    }
}