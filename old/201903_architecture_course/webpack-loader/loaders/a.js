function loader(source){
    console.log('a~~~~')
    return source; // string or buffer
}
loader.pitch = function(){
    console.log('a~~~~pitch')
}
module.exports = loader;

// pitch是正向的 loader 反向的 如果pitch有返回结果 会终止后续的执行

// babel-loader