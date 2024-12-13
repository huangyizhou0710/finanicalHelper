const { Controller } = require('egg');

/**
 * @Controller 黄金持有计划
 */
class GoldHoldingsPlanController extends Controller {
  /**
   * @summary 新增买入计划
   * @description 新增买入计划
   * @router post /goldHoldingsPlan/addPlan
   * @request body addPlanRequest *body
   */
  async addPlan() {
    const { plannedPrice, quantity, expectedChange, mode } = this.ctx.request.body;
    const userId = this.ctx.session.user.id;

    if (!userId || !plannedPrice || !quantity || !expectedChange) {
      this.ctx.throw(400, '缺少必要参数');
    }

    const success = await this.service.goldHoldingsPlan.addPlan(
      userId,
      plannedPrice,
      quantity,
      expectedChange,
      mode
    );

    if (success) {
      this.ctx.success({ message: '计划添加成功' });
    } else {
      this.ctx.throw(500, '计划添加失败');
    }
  }

  /**
   * @summary 买入计划
   * @description 买入计划
   * @router post /goldHoldingsPlan/buyPlan
   * @request body buyPlanRequest *body
   */
  async buyPlan() {
    const { planId, buyPrice, buyTime } = this.ctx.request.body;
    const success = await this.service.goldHoldingsPlan.buyPlan(planId, buyPrice, buyTime);

    if (success) {
      this.ctx.success({ message: '计划购入成功' });
    } else {
      this.ctx.throw(500, '计划购入失败');
    }
  }

  /**
   * @summary 卖出计划
   * @description 卖出计划
   * @router post /goldHoldingsPlan/sellPlan
   * @request body sellPlanRequest *body
   */
  async sellPlan() {
    const { planId, sellPrice, sellTime } = this.ctx.request.body;
    const success = await this.service.goldHoldingsPlan.sellPlan(planId, sellPrice, sellTime);

    if (success) {
      this.ctx.success({ message: '计划卖出成功' });
    } else {
      this.ctx.throw(500, '计划卖出失败');
    }
  }

  /**
   * @summary 获取用户持仓计划
   * @description 获取用户持仓计划
   * @router get /goldHoldingsPlan/getPlans
   */
  async getPlans() {
    const userId = this.ctx.session.user.id;
    if (!userId) {
      this.ctx.throw(400, '缺少用户 ID');
    }

    const plans = await this.service.goldHoldingsPlan.getPlans(userId);
    this.ctx.success(plans);
  }
}

module.exports = GoldHoldingsPlanController;