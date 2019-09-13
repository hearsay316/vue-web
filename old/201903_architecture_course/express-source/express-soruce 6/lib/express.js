// 创造一个路由系统，它里面放着所有的路由
const Application = require('./application');
const Router = require('./router');
function createApplication(){
    return new Application;
}
createApplication.Router = Router;
module.exports = createApplication;