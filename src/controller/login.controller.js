const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/serect");

class loginController {
  async sign(ctx, next) {
    // 1 获取用户信息
    const { id, name } = ctx.user;

    // 2 颁发身份令牌
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60 * 7, //7天有效期的token
      algorithm: "RS256",
    });

    // 3 返回用户信息
    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        token,
      },
    };
  }

  test(ctx, next) {
    ctx.body("验证身份通过~");
  }
}

module.exports = new loginController();
