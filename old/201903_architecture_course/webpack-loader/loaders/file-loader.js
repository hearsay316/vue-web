let loaderUtils = require('loader-utils');
function loader(source){ // minicss-exract-plugin
    let name = loaderUtils.interpolateName(this,'[hash:8].[ext]',{content:source});
    this.emitFile(name,source);
    return `module.exports='${name}'`;
}
loader.raw = true; // 这样写标示source是一个二进制
module.exports = loader;