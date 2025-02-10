const fs = require("fs");

function registerRouters(app) {
  // 1.读取当前文件夹下的所有文件
  // 使用 fs.readdirSync 同步读取当前目录（__dirname）下的所有文件和文件夹名称，并存储在 files 数组中
  const files = fs.readdirSync(__dirname);

  // 2.遍历所有的文件
  // 使用 for...of 循环遍历 files 数组中的每个文件
  for (const file of files) {
    if (!file.endsWith(".router.js")) continue;
    const router = require("./${file}");
    // 使用 app.use 方法将路由模块的路由规则注册到应用中
    app.use(router.routes());
    // 使用 app.use 方法注册路由模块允许的 HTTP 方法，用于处理 OPTIONS 请求等
    app.use(router.allowedMethods());
  }
}

module.exports = registerRouters;
