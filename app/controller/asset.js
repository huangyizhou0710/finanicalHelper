const { Controller } = require('egg');

/**
 * @Controller 资产管理
 */
class AssetController extends Controller {
  /**
   * @summary 添加或更新资产
   * @description 添加或更新用户资产
   * @router post /asset/addOrUpdateAsset
   * @request body addOrUpdateAssetRequest *body
   */
  async addOrUpdateAsset() {
    const { assetType, assetCode, assetName, quantity } = this.ctx.request.body;
    const userId = this.ctx.session.user.id;
    console.log('userId', userId);

    if (!userId || !assetType || !assetCode || !quantity) {
      this.ctx.throw(400, '缺少必要参数');
    }

    const success = await this.ctx.service.asset.updateAsset(
      {
        userId,
        assetType,
        assetCode,
        assetName,
        quantity,
      }
    );

    if (success) {
      this.ctx.success({ message: '资产更新成功' });
    } else {
      this.ctx.throw(500, '资产更新失败');
    }
  }

  /**
   * @summary 获取用户资产
   * @description 获取用户所有资产
   * @router get /asset/getUserAssets
   */
  async getUserAssets() {
    const userId = this.ctx.session.user.id;

    if (!userId) {
      this.ctx.throw(400, '缺少用户 ID');
    }

    const assets = await this.service.asset.getUserAssets(userId);
    this.ctx.body = { assets };
  }
}

module.exports = AssetController;
