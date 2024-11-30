const { Controller } = require('egg');

class priceController extends Controller {
  async index() {
    const { ctx } = this;
    const price = await ctx.service.price.get();
    ctx.body = price;
  }
  async create() {
    const { ctx } = this;
    const price = await ctx.service.price.create(ctx.request.body);
    ctx.body = price;
  }
}

module.exports = priceController;
