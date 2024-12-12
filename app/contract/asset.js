'use strict';

module.exports = {
  addOrUpdateAssetRequest: {
    assetType: { type: 'string', required: true, description: '资产类型 gold-黄金 stock-股票 fund-基金' },
    assetCode: { type: 'string', required: true, description: '资产代码' },
    assetName: { type: 'string', required: true, description: '资产名称' },
    quantity: { type: 'number', required: true, description: '资产数量' },
  }
}