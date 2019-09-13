let path = require('path');
let fs = require('fs');
let babylon = require('babylon');
let traverse = require('@babel/traverse').default;
let generator = require('@babel/generator').default;
let {SyncHook} = require('tapable');
// 提供一个运行的方法
class Compiler {
    constructor(config){
        // 用户所有的配置 entry,output
        this.config = config;
        this.entry = config.entry; // ./src/index.js
        this.root = process.cwd(); // 运行命令的位置
        this.entryId = ''; // 入口
        this.modules = {}; // 这个就是所有的依赖关系
        this.hooks = {
            entryOption:new SyncHook(['compiler']),
            emitFile:new SyncHook(['compiler']),
            parser:new SyncHook(['compiler'])
        }
        config.plugins.forEach(instance=>{
            instance.apply(this);
        })
    }
    getSource(modulePath){ // 根据路径 读取文件中的内容
        let source = fs.readFileSync(modulePath,'utf8');

        // modulePath当前路径 文件的路径 如果匹配到了用户的规则，把loader执行一下把loader中的结果返回回来
        let rules = this.config.module.rules;
        for(let i = 0 ; i < rules.length ; i++ ){
            let {test:reg,use} = rules[i];
            if(reg.test(modulePath)){ // 如果路径匹配上了
                // 需要先定位到最后一个 [style-loader ,less-loader]
                // loader narmal-loader
                let len = use.length - 1;
                function normalLoader(){ // loader 可能是异步的
                    let loader = use[len--]; // 取到最后一个
                    if(loader){ // 如果能取到
                        let l = require(loader); //让loader执行
                        source = l(source);
                        normalLoader(); // 继续取下一个
                    }
                }
                normalLoader();
            }
        }
        return source
    }
    parser(source,parentDir){ // 解析source  src
        let ast = babylon.parse(source);
        let dependencies = [];
        traverse(ast,{ // visitor
            CallExpression(p){ // 匹配所有的调用表达式
                let node = p.node;
                if(node.callee.name === 'require'){
                    node.callee.name = '__webpack_require__';
                    // 增加一个后缀名 .js
                    node.arguments[0].value = path.extname(node.arguments[0].value)?node.arguments[0].value:node.arguments[0].value+'.js';
                    // ./src/util/b.js
                    node.arguments[0].value = './'+path.join(parentDir,node.arguments[0].value);
                    dependencies.push(node.arguments[0].value);
                }
            }
        });
        let r = generator(ast);
        this.hooks.parser.call(this);
        return {r:r.code,dependencies}
    }
    buildModule(modulePath,isMain){ 
        // /usr/local/work
        // /usr/local/work/src/index.js
        let relativePath = './'+path.relative(this.root,modulePath); // src/index
        let parentDir = path.dirname(relativePath); // src
        let source = this.getSource(modulePath);
        // ast 抽象语法树 esprima traverse         generator
        // @babel/core  babylon @babel/traverse  @babel/generator
        if(isMain){
            this.entryId = relativePath; // 我们当前的主模块
        }
        let {r,dependencies} = this.parser(source,parentDir);
        this.modules[relativePath] = r;
        dependencies.forEach(dep=>{ // ./src/util/b.js
            this.buildModule(path.join(this.root,dep));
        })
    }
    emitFile(){
        let ejs = require('ejs');
        let templateStr = this.getSource(path.resolve(__dirname,'./ejs.ejs'));
        let str = ejs.render(templateStr,{
            entryId:this.entryId,
            modules:this.modules
        });
        let {filename,path:p} = this.config.output;
        // 将内容写入到文件内
        
        this.assets = { // 专门用来存放资源的
            // bundle.js  : 结果
            [filename]:str
        }
        Object.keys(this.assets).forEach(key=>{
            fs.writeFileSync(path.join(p,key),this.assets[key]);
        })
        this.hooks.emitFile.call(this);
    }
    run(){
       // 运行的时候？ 图谱  {key,value}
        this.buildModule(path.join(this.root,this.entry),true)
       // 在用模板生成一个 输出的文件
       this.emitFile(); // 发射一个文件
    }
}
module.exports = Compiler;