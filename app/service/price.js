const { Service } = require('egg');

class priceService extends Service {
  async get() {
    // 取glodPrice最新的一条数据
    const sql = `
      SELECT * 
      FROM gold_price
      ORDER BY modify_time DESC
      LIMIT 1
    `;
    const price = await this.app.mysql.query(sql);
    return { price };
  }
  async create(data) {
    // 创建一条glodPrice数据
    const result = await this.app.mysql.insert('glodPrice', data);
    return result;
  }
}

module.exports = priceService;