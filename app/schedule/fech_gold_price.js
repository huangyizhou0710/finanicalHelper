// app/schedule/fetch_gold_price.js
const Subscription = require('egg').Subscription;

class FetchGoldPrice extends Subscription {
  // 定时任务配置
  static get schedule() {
    return {
      interval: '6m', // 每隔10分钟执行一次
      type: 'worker', // 每台 Worker 都执行
    };
  }

  // 任务逻辑
  async subscribe() {
    const now = new Date();
    const currentHour = now.getHours();

    // 限定执行时间段为 9:00-18:00
    // if (currentHour < 9 || currentHour >= 18) {
    //   this.ctx.logger.info('当前时间不在任务执行时间范围内');
    //   return;
    // }

    // 调用第三方接口
    const apiUrl = 'http://api.k780.com/?app=finance.gold_price&goldid=1053&appkey=74793&sign=a78fb0552e24f24bbe7a0aef0c24d470&format=json'; // 替换为真实接口地址
    const response = await this.ctx.curl(apiUrl, {
      method: 'GET',
      dataType: 'json',
    });

    if (response.status === 200 && response.data.success === '1') {
      const goldData = response.data.result.dtList['1053']; // 根据返回格式解析数据
      if (!goldData) {
        this.ctx.logger.warn('接口返回数据为空');
        return;
      }

      // const existing = await this.app.mysql.get('gold_price', { uptime: goldData.uptime });
      // if (existing) {
      //   this.ctx.logger.info('数据已存在，跳过插入');
      //   return;
      // }

      // 准备插入数据库的数据
      const dataToInsert = {
        last_price: parseFloat(goldData.last_price),
        start_price: parseFloat(goldData.open_price),
        uptime: goldData.uptime, // 接口返回的更新时间
        modify_time: this.app.mysql.literals.now, // 当前插入时间
        change_margin: goldData.change_margin,
      };

      // 插入到 goldPrice 表中
      const result = await this.app.mysql.insert('gold_price', dataToInsert);

      if (result.affectedRows === 1) {
        this.ctx.logger.info('成功插入数据:', dataToInsert);
      } else {
        this.ctx.logger.error('数据插入失败:', dataToInsert);
      }
    } else {
      this.ctx.logger.error('接口调用失败:', response.data || response);
    }
  }
}

module.exports = FetchGoldPrice;
