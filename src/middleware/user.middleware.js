const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");

// 验证客户端传递过来的user是否可以保存在user数据库中
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //  1 验证用户名/密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 2 判断name是否在数据库中已经存在
  const users = await userService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  // 3 执行下一个中间件
  await next();
};

const handlePassword = async (ctx, next) => {
  // 1 取出密码
  const { password } = ctx.request.body;

  // 2 对密码进行加密
  ctx.request.body.password = md5password(password);

  // 3 执行下一个中间件
  await next();
};

module.exports = { verifyUser, handlePassword };
