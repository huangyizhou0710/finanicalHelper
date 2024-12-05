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
    const payload = ctx.request.body || {};
    // 校验参数
    const { username, password } = payload;
    if(!username || !password) {
      ctx.throw(500, '请输入账户密码')
    }
    const users = await ctx.service.user.findByUsername(username)
    if(users) {
      ctx.throw(500, '账号已存在，请登录')
    }
    // 组装参数
    // 调用 Service 进行业务处理
    const success = await ctx.service.user.create(payload);
    // 设置响应内容和响应状态码
    if(success) {
      ctx.success(users);
    } else {
      ctx.fail(500, '注册失败')
    }
  }

  /**
   * @summary 用户登录
   * @description 用户登录
   * @router post /user/login
   * @request body userLoginRequest *body
   */
  async login() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    // 校验参数
    const { username, password } = payload;
    if(!username || !password) {
      ctx.throw(500, '请输入账户密码')
    }
    const users = await ctx.service.user.findByUsername(username)
    if(!users) {
      ctx.throw(500, '该账号不存在')
    }
    const isVaild = await ctx.service.user.verifyPassword(password, users.password)
    if(!isVaild) {
      ctx.throw(500, '密码不正确')
    }
    // 组装参数
    // 调用 Service 进行业务处理
    ctx.session.user = {
      id: users.id,
      username: users.username
    }
    ctx.success({
      message: '登录成功',
      user: {
        id: users.id,
        username: users.username
      }
    })
  }
}

module.exports = UserController;