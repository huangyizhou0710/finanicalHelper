const { Service } = require('egg');
const bcrypt = require('bcrypt')

class UserService extends Service {
  // 创建用户
  async create(user) {
    const { username, password } = user;
    const hashPassword = await bcrypt.hash(password, 10)

    const result = await this.app.mysql.insert('users', {
      username,
      password: hashPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return result.affectedRows === 1;
  }

  // 根据账号查找用户
  async findByUsername(username) {
    const users = await this.app.mysql.get('users', {username})
    return users
  }

  // 验证密码
  async verifyPassword(inputPassword, storePassword) {
    return await bcrypt.compare(inputPassword, storePassword)
  }

  // 更新用户信息
  async updateUserInfo(userId, userInfo) {
    const { username, password, ...rest } = userInfo;
    const changeInfo = {
      id: userId,
      ...rest,
      updated_at: new Date(),
    }
    if(password) {
      const hashPassword = await bcrypt.hash(password, 10)
      changeInfo.password = hashPassword
    }
    const result = await this.app.mysql.update('users', changeInfo);
    return result.affectedRows === 1;
  }
}

module.exports = UserService;