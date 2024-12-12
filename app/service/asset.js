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
      // 更新资产
      const result = await this.app.mysql.update('user_assets', {
        id: existingAsset.id,
        quantity: existingAsset.quantity + quantity,
        updated_at: this.app.mysql.literals.now,
      });
      return result.affectedRows === 1;
    } else {
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
    return await this.app.mysql.select('user_assets', {
      where: { user_id: userId },
      orders: [['updated_at', 'desc']],
    });
  }
}

module.exports = AssetService;
