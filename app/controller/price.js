const { Controller } = require('egg');

class priceController extends Controller {
  async index() {
    const { ctx } = this;
    const price = await ctx.service.price.get();
    ctx.body = price;
  }
}

module.exports = priceController;
