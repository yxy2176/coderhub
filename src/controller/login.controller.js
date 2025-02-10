class loginController {
  async sign(ctx, next) {
    // 1 获取用户信息
    const { id, name } = ctx.user;

    // 2 颁发身份令牌
    // const token=

    // 3 返回用户信息
  }

  async test(ctx, next) {
    ctx.body("验证身份通过~");
  }
}

module.exports = new loginController();
