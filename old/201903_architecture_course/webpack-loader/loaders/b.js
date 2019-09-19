function loader(source){
    console.log('b~~~~')
    return source; // string or buffer
}
loader.pitch = function(){
    console.log('b~~~~pitch');
    //return 'xxx'; // 此时会终止调用后面的loader
}
module.exports = loader;