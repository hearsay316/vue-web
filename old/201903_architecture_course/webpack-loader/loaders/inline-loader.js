function loader(source){
    console.log('inline-loader')
    return source; // string or buffer
    
}
module.exports = loader;