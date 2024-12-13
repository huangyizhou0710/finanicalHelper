const { Service } = require('egg')

class GoldHoldingsPlanService extends Service {
  // 新增买入计划
  async addPlan(userId, plannedPrice, quantity, expectedChange, mode = 'manual') {

    const result = await this.app.mysql.insert('gold_holdings_plans', {
      user_id: userId,
      plan_time: this.app.mysql.literals.now,
      planned_price: plannedPrice,
      quantity,
      status: 'planed',
      expected_change: expectedChange,
      mode,
    });

    return result.affectedRows === 1;
  }

  // 买入
  async buyPlan(planId, buyPrice, buyTime) {
    const plan = await this.app.mysql.get('gold_holdings_plans', { id: planId });

    if (!plan || plan.status !== 'planed') {
      return { success: false, message: '计划不存在或已完成' };
    }


    // 更新计划状态
    const result = await this.app.mysql.update('gold_holdings_plans', {
      id: planId,
      buy_price: buyPrice,
      buy_time: buyTime,
      status: 'bought',
      updated_at: this.app.mysql.literals.now,
    });

    if (result.affectedRows === 1) {
      // 更新交易记录和资产表：买入
      await this.service.goldTransaction.addTransaction(
        plan.user_id,
        'buy',
        plan.quantity,
        buyPrice,
        buyTime
      );

      return { success: true, message: '改计划已购入' };
    }

    return { success: false, message: '计划更新失败' };
  }

  // 卖出
  async sellPlan(planId, sellPrice, sellTime) {
    const plan = await this.app.mysql.get('gold_holdings_plans', { id: planId });

    if (!plan || plan.status !== 'bought') {
      return { success: false, message: '计划不存在或未购入' };
    }

    // 计算实际涨跌幅
    const actualChange = ((sellPrice - plan.buy_price) / plan.buy_price) * 100;

    // 更新计划状态
    const result = await this.app.mysql.update('gold_holdings_plans', {
      id: planId,
      sell_price: sellPrice,
      sell_time: sellTime,
      status: 'sold',
      actual_change: actualChange,
      updated_at: this.app.mysql.literals.now,
    });

    if (result.affectedRows === 1) {
      // 更新交易记录和资产表：卖出
      await this.service.goldTransaction.addTransaction(
        plan.user_id,
        'sell',
        plan.quantity,
        sellPrice,
        sellTime
      );

      return { success: true, message: '改计划已卖出' };
    }

    return { success: false, message: '计划更新失败' };
  }

  // 获取计划列表
  async getPlans(userId) {
    return await this.app.mysql.select('gold_holdings_plans', {
      where: { user_id: userId },
      orders: [['plan_time', 'desc']],
    });
  }
}

module.exports = GoldHoldingsPlanService;