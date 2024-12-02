// app/extend/context.js
module.exports = {
  success(data) {
    this.body = {
      code: 200,
      data
    };
    this.status = 200;
  },
  fail(errorCode = 500, msg = '出现错误') {
    this.body = {
      errorCode: 500,
      msg,
    };
    this.status = errorCode;
  }
};