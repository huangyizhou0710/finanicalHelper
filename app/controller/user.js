const { Controller } = require('egg');


/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /user/create
   * @request body createUserRequest *body
   */
  async create() {
    const { ctx } = this;
    // 校验参数
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await ctx.service.user.create(payload);
    // 设置响应内容和响应状态码
    ctx.success(res);
  }

  /**
   * @summary 用户登录
   * @description 用户登录
   * @router post /user/login
   * @request body userLoginRequest *body
   */
  async login() {
    const { ctx, service } = this;
    // 校验参数
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const user = await service.user.login(payload);
    if (user?.id) {
      ctx.success(user); // Correct the variable to `user`
    } else {
      ctx.fail(500, '登录失败'); // Provide meaningful message
    }
  }
}

module.exports = UserController;