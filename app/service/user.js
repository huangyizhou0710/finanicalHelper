const { Service } = require('egg');

class UserService extends Service {
  // 创建用户
  async create(user) {
    const { username, password } = user;
    const newUser = await this.app.mysql.insert('users', {
      username,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newUser;
  }

  // 登录验证
  async login(user) {
    const { username, password } = user;
    // 查询数据库中的用户
    const existingUser = await this.app.mysql.get('users', { username, password });
    return existingUser ? existingUser : null;
  }
}

module.exports = UserService;