const connection = require("../app/database");

class userService {
  create(content, userId) {
    const statement = "";
    connection.execute(statement, []);
  }
}

module.exports = new userService();
