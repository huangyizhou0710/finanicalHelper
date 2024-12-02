// app/middleware/timezone.js
const moment = require('moment')

module.exports = (options, app) => {
  return async function timezone(ctx, next) {
    // 假设将所有请求的时间参数转换为 UTC
   
    await next();
  };
};
