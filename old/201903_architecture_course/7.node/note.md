## node 执行环境 让js 可以运行在服务端 runtime
- js里面包含着三部分 DOM BOM ECMAScript (没有系统级的api fileReader)
- ECMAScript (前端支持 es6写法 import export) 封装了很多内置模块 fs http...

## node版本 11.14.0
- 不同版本之间是有差异的  eventLooop


## node 是一个运行的进程
- 每个软件启动的时候 都会开一个进程 计算机分配调度任务的单位  进程
- 线程 在js中 进程中包含一条主线程 
- 多进程 tomcat （线程池 复用线程） （多个人操作同一个资源 锁的问题） (cpu密集) 
- js 的单线程的特性 ： 为了保证线程之间不干扰所以是单线程   (i/o密集)

## 异步非阻塞  基于事件回调的机制
- 异步 ，同步
- 非阻塞， 阻塞 

## node中实现了一个libuv库 这个库就是用多线程来模拟异步

## 子进程 集群 自动重启