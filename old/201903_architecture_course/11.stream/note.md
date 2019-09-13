## Buffer
- alloc(3) Buffer.from('字符串'|[])  里面是16进制 只是为了看着短一些
- toString()
- slice forEach (copy) => concat
- indexOf -> split 我们可以操作二进制内容
- isBuffer
## fs (vm) path util events 
- fs readFile writeFile 可能会淹没可用内存  (同步和异步)
- fs (write read) open close 
- fs (stat -> access isDirectory isFile)
- fs.mkdir  fs.rmdir unlink rename appendfile...
## path 方法  (__dirname,__filename) 模块的概念 
- path.resolve path.join
- path.extname path.basename
- path.dirname
## util (工具库 判断类型)
- inherits
- promisify
## evens
- on emit once off newListener
