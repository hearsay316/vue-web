// 基类 负责调度
class Compiler{
    constructor(el,vm){
        // 判断el属性是不是元素,不是就获取
        this.el =this.isElementNode(el)?el:document.querySelector(el);

        this.vm = vm;

        // 把当前节点中的元素获取到 放到内存中去
        let fragment = this.node2fragment(this.el);

        this.el.appendChild(fragment);
    }
    compile(node){
        let childNodes = node.childNodes
    }
    node2fragment(node){
        // 在内存中建立一个内存片段
        let fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild=node.firstChild) {
            fragment.appendChild(firstChild);
            console.log(firstChild);
        }
        return fragment;
    }
    isElementNode(node) {
        return node.nodeType===1;
    }
}

class Vue {
    constructor(options){
        // this.$el $data $options
        this.$el = options.el;
        this.$data = options.data;
        if(this.$el){
                new Compiler(this.$el,this)
        }
    }
}
