let path = require('path');
// 周五 loader 和 plugin的编写
class A{
    apply(compiler){
        compiler.hooks.parser.tap('xxx',function(){
            console.log('parser')
        })
    }
}
class B{
    apply(compiler){
        compiler.hooks.emitFile.tap('xxx',function(){
            console.log('emitFile')
        })
    }
}
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {test:/\.less$/,use:[
                path.resolve(__dirname,'loaders','style-loader.js'),
                path.resolve(__dirname,'loaders','less-loader.js')
            ]}
        ]
    },
    plugins:[
        new B,
        new A,
    ]
}

