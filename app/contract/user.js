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
  
};