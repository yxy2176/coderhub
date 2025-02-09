const app = require("./app");
const { SERVER_PORT } = require("./config/server");
// 引入 error 事件监听器
require("./utils/handle-error");

app.listen(SERVER_PORT, () => {
  console.log("coderhub的服务器启动成功~");
});
