'use strict';

module.exports = {
  createUserRequest: {
    username: { type: 'string', required: true, description: '用户姓名' },
    password: { type: 'string', required: true, description: '用户密码' },
  },
  userLoginRequest: {
    username: { type: 'string', required: true, description: '用户姓名' },
    password: { type: 'string', required: true, description: '用户密码' },
  },
  updatePasswordRequest: {
    oldPassword: { type: 'string', required: true, description: '旧密码' },
    newPassword: { type: 'string', required: true, description: '新密码' },
  },
  updateUserConfigRequest: {
    pushGoldMinPrice : { type: 'number', description: '黄金最低价格' }, 
    pushGoldMaxPrice : { type: 'number', description: '黄金最高价格' },
    pushGoldTime : { type: 'string', description: '黄金价格变动' },
    goldExpectedChange: { type: 'number', description: '黄金预期变动' },
  }
};