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
  addOrUpdateAssetRequest: {
    assetType: { type: 'string', required: true, description: '资产类型 gold-黄金 stock-股票 fund-基金' },
    assetCode: { type: 'string', required: true, description: '资产代码' },
    assetName: { type: 'string', required: true, description: '资产名称' },
    quantity: { type: 'number', required: true, description: '资产数量' },
  }
};