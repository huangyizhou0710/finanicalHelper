const { Service } = require('egg');

class AssetService extends Service {
  // 添加或更新用户资产
  async updateAsset(asset) {
    const { ctx } = this;
    const { userId, assetType, assetCode, assetName, quantity, unitPrice } = asset;
    const existingAsset = await this.app.mysql.get('user_assets', {
      user_id: userId,
      asset_type: assetType,
      asset_code: assetCode,
    });

    if (existingAsset) {
      // 若existingAsset.quantity + quantity小于0，则不允许更新
      if (existingAsset.quantity + quantity < 0) {
        return false;
      }
      // 更新资产
      const result = await this.app.mysql.update('user_assets', {
        id: existingAsset.id,
        quantity: existingAsset.quantity + quantity,
        updated_at: this.app.mysql.literals.now,
      });
      return result.affectedRows === 1;
    } else {
      // 若quantity小于0，则不允许添加
      if (quantity < 0) {
        return false;
      }
      // 添加新资产
      const result = await this.app.mysql.insert('user_assets', {
        user_id: userId,
        asset_type: assetType,
        asset_code: assetCode,
        asset_name: assetName,
        quantity,
      });
      return result.affectedRows === 1;
    }
  }

  // 查询用户所有资产
  async getUserAssets(userId) {
    console.log('this.app.mysql.literals.now', this.app.mysql.literals.now)

    return await this.app.mysql.select('user_assets', {
      where: { user_id: userId },
      orders: [['updated_at', 'desc']],
    });
  }

  async getGoldAsset(userId) {
    const { ctx } = this;
    // 获取当前金价
    const goldPrice = await ctx.service.price.get();
    const currentPrice = goldPrice?.price?.[0]?.last_price || 0;
    if(currentPrice === 0) {
      return { code: '1', message: '暂无金价信息' };
    }
    // 获取用户持仓
    const userAsset = await this.app.mysql.get('user_assets', {
      user_id: userId,
      asset_type: 'gold',
    });

    if (!userAsset) {
      return { code: '2', message: '暂无持仓信息' };
    }
    // 计算持仓价值
    let holdingValue = 0;
    holdingValue = userAsset.quantity * currentPrice;


    // 获取用户的交易记录
    const transactions = await this.app.mysql.select('gold_transactions', {
      where: { user_id: userId },
    });

    // 初始化数据
    let buyAmount = 0; // 买入总金额
    let sellAmount = 0; // 卖出总金额

    transactions.forEach(transaction => {
      if (transaction.transaction_type === 'buy') {
        buyAmount += transaction.total_price;
      } else if (transaction.transaction_type === 'sell') {
        sellAmount += transaction.total_price;
      }
    });

    // 总盈利 = 卖出总金额 + 持仓价值 + (买入总金额-负数)
    const totalProfit = sellAmount + holdingValue + buyAmount;

    // 总收益率 = 总盈利 / 买入总金额 * 100
    const totalYield = -buyAmount > 0 ? ((totalProfit / -buyAmount) * 100).toFixed(2) + '%' : '0.00%';

    return { ...userAsset, unit_price: currentPrice, buyAmount, sellAmount, totalProfit, totalYield };
  }
}

module.exports = AssetService;
