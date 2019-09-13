let webpack = require('webpack');
let path = require('path');
module.exports = {
    entry:{
        react:['react','react-dom']
    },
    mode:'development',
    output:{
        library:'react', // 别人需要引用这个react变量
        //libraryTarget:'this', // commonjs2
        filename:'[name].dll.js'
    },
    plugins:[
        new webpack.DllPlugin({
            name:'react',
            path:path.resolve(__dirname,'dist/manifest.json')
        })
    ]
}