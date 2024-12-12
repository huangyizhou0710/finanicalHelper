const { Controller } = require('egg');

/**
 * @Controller 黄金交易
 */
class GoldTransactionController extends Controller {
  /**
   * @summary 添加黄金交易记录
   * @description 添加黄金交易记录
   * @router post /goldTransaction/addTransaction
   * @request body addTransactionRequest *body
   */
  async addTransaction() {
    const { transactionType, quantity, unitPrice, transactionTime } = this.ctx.request.body;
    const userId = this.ctx.session.user.id;

    if (!userId || !transactionType || !quantity || !unitPrice || !transactionTime) {
      this.ctx.throw(400, '缺少必要参数');
    }

    if(transactionType === 'buy' && quantity < 0) {
      this.ctx.throw(400, '买入数量不能小于0');
    }

    if(transactionType === 'sell' && quantity > 0) {
      this.ctx.throw(400, '卖出数量不能大于0');
    }

    const success = await this.service.goldTransaction.addTransaction(
      userId,
      transactionType,
      quantity,
      unitPrice,
      transactionTime
    );

    if (success) {
      this.ctx.body = { message: '交易记录成功' };
    } else {
      this.ctx.throw(500, '交易记录失败');
    }
  }

  /**
   * @summary 获取用户交易记录
   * @description 获取用户交易记录
   * @router get /goldTransaction/getTransactions
   */
  async getTransactions() {
    const userId = this.ctx.session.user.id;

    if (!userId) {
      this.ctx.throw(400, '缺少用户 ID');
    }

    const transactions = await this.service.goldTransaction.getTransactions(userId);
    this.ctx.body = { transactions };
  }
}

module.exports = GoldTransactionController;
