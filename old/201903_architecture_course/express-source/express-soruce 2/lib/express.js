// 创造一个路由系统，它里面放着所有的路由
const Application = require('./application')
function createApplication(){
    return new Application;
}
module.exports = createApplication;