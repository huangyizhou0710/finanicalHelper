const { Controller } = require('egg');

/**
 * @controller priceController 黄金价格管理
 * @description 提供黄金价格的增删改查
 * @router /gold/price
 * @apikey
 * @request header string *Authorization token
 * @consumes application/json
 * @produces application/json
 * @middleware [timezone]
 * @middleware [errorHandler]
 */
class priceController extends Controller {
  /**
   * @summary 获取金价
   * @description 获取金价
   * @router get /gold/price
   * @apikey
   * @return {object} price - 金价
   * @return {number} price.last_price - 最新价格
   * @return {number} price.start_price - 开盘价
   * @return {string} price.uptime - 更新时间
   * @return {string} price.modify_time - 修改时间
   * @return {number} price.change_margin - 涨跌幅
   * @return {number} price.change_price - 涨跌额
   * @return {number} price.buy_price - 买入价
   * @return {number} price.sell_price - 卖出价
   * @return {number} price.high_price - 最高价
   * @return {number} price.low_price - 最低价
   * @return {number} price.yesy_price - 昨收价
   * @return {number} price.id - id
   */
  async index() {
    const { ctx } = this;
    const price = await ctx.service.price.get();
    ctx.success({
      ...price.price[0],
    })
  }
  /**
   * @summary 创建金价
   * @description 创建金价
   * @router post /gold/price
   */
  async create() {
    const { ctx } = this;
    const price = await ctx.service.price.create(ctx.request.body);
    ctx.body = price;
  }
  /**
   * @summary 获取当日金价
   * @description 获取当日金价
   * @router get /gold/price/today
   */
  async today() {
    const { ctx } = this;
    const price = await ctx.service.price.getToday();
    ctx.success(price.price)
  }
  /**
   * @summary 获取历史金价
   * @description 获取历史金价
   * @router get /gold/price/history
   * @request query string startTime *query
   * @request query string endTime *query
   */
  async history() {
    const { ctx } = this;
    const { startTime, endTime } = ctx.query;
    const price = await ctx.service.price.getHistory(startTime, endTime);
    ctx.success(price.price)
  }
}

module.exports = priceController;
