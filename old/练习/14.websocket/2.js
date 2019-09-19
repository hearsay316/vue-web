let express = require("express");
let app = express();
app.use(express.static(__dirname));
app.listen(3000);
let Websocketer = require('ws').Server;
let webServe = new Websocketer({port:8888});
webServe.on('connection',function (socket) {
    console.log("成功连接");
    socket.on('message',function (message) {
        console.log("接受到客户端的消息是",message);
        socket.send('服务器回应',message);
    })
});