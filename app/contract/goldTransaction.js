'use strict';

module.exports = {
  addTransactionRequest: {
    transactionType: { type: 'string', required: true, description: '交易类型 buy-买入 sell-卖出' },
    quantity: { type: 'number', required: true, description: '交易数量' },
    unitPrice: { type: 'number', required: true, description: '交易单价' },
    transactionTime: { type: 'string', required: true, description: '交易时间' },
  }
}