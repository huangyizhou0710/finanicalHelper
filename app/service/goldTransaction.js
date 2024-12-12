const { Service } = require('egg');

class GoldTransactionService extends Service {
  // 添加黄金交易记录
  async addTransaction(userId, transactionType, quantity, unitPrice, transactionTime) {
    const { ctx } = this;
    // 若是买入，则totalPrice为负数；若是卖出，则totalPrice为正数
    const totalPrice = -quantity * unitPrice;

    const existingAsset = await this.app.mysql.get('user_assets', {
      user_id: userId,
      asset_type: 'gold',
      asset_code: 'gold',
    });
    if(existingAsset && existingAsset.quantity + quantity < 0) {
      return false;
    }
    // 插入交易记录
    const transactionResult = await this.app.mysql.insert('gold_transactions', {
      user_id: userId,
      transaction_type: transactionType,
      quantity,
      unit_price: unitPrice,
      total_price: totalPrice,
      transaction_time: transactionTime,
      created_at: this.app.mysql.literals.now,
      updated_at: this.app.mysql.literals.now,
    });

    if (transactionResult.affectedRows === 1) {
      await ctx.service.asset.updateAsset({
        userId: userId,
        assetType: 'gold',
        assetName: '黄金T+D',
        assetCode: 'gold',
        quantity,
      })
      return true;
    }
    return false;
  }

  // 获取用户交易记录
  async getTransactions(userId) {
    return await this.app.mysql.select('gold_transactions', {
      where: { user_id: userId },
      orders: [['transaction_time', 'desc']],
    });
  }
}

module.exports = GoldTransactionService;
