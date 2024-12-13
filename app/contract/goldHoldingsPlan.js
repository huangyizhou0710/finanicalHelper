'use strict';

module.exports = {
  addPlanRequest: {
    plannedPrice: { type: 'number', required: true, description: '计划价格' },
    quantity: { type: 'number', required: true, description: '计划数量' },
    expectedChange: { type: 'number', required: true, description: '预期变化' },
    mode: { type: 'string', required: true, description: '计划模式', enum: ['manual', 'auto'] },
  },
  buyPlanRequest: {
    planId: { type: 'string', required: true, description: '计划 ID' },
    buyPrice: { type: 'number', required: true, description: '购入价格' },
    buyTime: { type: 'string', required: true, description: '购入时间' },
  },
  sellPlanRequest: {
    planId: { type: 'string', required: true, description: '计划 ID' },
    sellPrice: { type: 'number', required: true, description: '卖出价格' },
    sellTime: { type: 'string', required: true, description: '卖出时间' },
  }
}