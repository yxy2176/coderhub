// crypto是Node.js 内置的一个用于加密和解密的模块，它提供了各种加密算法和工具  => 使用它来进行 MD5 哈希加密。
const crypto = require("crypto");

function md5password(password) {
  const md5 = crypto.createHash("md5");
  // 'hex' 参数表示以十六进制字符串的形式输出哈希结果
  const md5pwd = md5.update(password).digest("hex");

  return md5pwd;
}

module.exports = md5password;
