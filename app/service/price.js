const { Service } = require('egg');

class priceService extends Service {
  async get() {
    // 取glodPrice最新的一条数据
    const price = await this.app.mysql.get('glodPrice', {
        order: [['id', 'desc']],
      }
    )
    return { price };
  }
  async create(data) {
    // 创建一条glodPrice数据
    const result = await this.app.mysql.insert('glodPrice', data);
    return result;
  }
}

module.exports = priceService;