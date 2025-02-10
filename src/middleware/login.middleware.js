const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
} = require("../config/error");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../config/serect");

// 判断用户输入的身份信息是否正确
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 1 判断用户名 / 密码 是否 非空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 2 判断该用户是否在数据库中存在
  const users = await userService.findUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }

  // 3 判断密码是否匹配正确
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }

  // 4 将该匹配到的user对象保存在ctx中
  ctx.user = user;

  // 执行下一个中间件
  await next();
};

// 判断身份令牌
const verifyAuth = async (ctx, next) => {
  // 1 获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 2 验证token是否有效
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    // 将token的信息保存下来
    ctx.user = result;

    // 执行下一个中间件
    await next();
  } catch (error) {
    ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
};

module.exports = { verifyLogin, verifyAuth };
