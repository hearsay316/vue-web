export let a = ()=>{
    return function(){
        return 'xxx'
    }
}   
console.log(a()); // 副作用