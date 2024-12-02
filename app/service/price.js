const { Service } = require('egg');

class priceService extends Service {
  async get() {
    // 取goldPrice最新的一条数据
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
    // 创建一条goldPrice数据
    const result = await this.app.mysql.insert('goldPrice', data);
    return result;
  }
  // 获取当日的金价数据
  async getToday() {
    const sql = `
      SELECT * 
      FROM gold_price
      WHERE TO_DAYS(uptime) = TO_DAYS(NOW())
    `;
    const price = await this.app.mysql.query(sql);
    return { price };
  }
  // 根据传入的时间段获取历史金价数据
  async getHistory(startTime, endTime) {
    const sql = `
      SELECT * 
      FROM gold_history_prices
      WHERE uptime BETWEEN ? AND ?
    `;
    const price = await this.app.mysql.query(sql, [startTime, endTime]);
    return { price };
  }
}

module.exports = priceService;