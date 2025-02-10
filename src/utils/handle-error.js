const app = require("../app");

const {
  NAME_IS_ALREADY_EXISTS,
  NAME_OR_PASSWORD_IS_REQUIRED,
} = require("../config/error");

app.on("error", (err, ctx) => {
  let code = 0;
  let message = "";

  switch (err) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "用户名或者密码不能为空~";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已经被占用, 请输入新的用户名~";
    case NAME_IS_NOT_EXISTS:
      code = -1003;
      message = "用户名不存在, 请检测用户名~";
      break;
    case PASSWORD_IS_INCORRENT:
      code = -1004;
      message = "输入的密码错误, 请检测密码~";
      break;
  }

  ctx.body = { code, message };
});
