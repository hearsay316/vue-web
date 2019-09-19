function loader(source){
    console.log('c~~~~')
    return source; // string or buffer
    
}
loader.pitch = function(){
    console.log('c~~~~pitch')
}
module.exports = loader;