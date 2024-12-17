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

  /**
   * @summary 登出
   * @description 登出
   * @router post /user/logout
   */
  async logout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.success({
      message: '已退出登录'
    })
  }

  /**
   * @summary 获取用户信息
   * @description 获取用户信息
   * @router get /user/getUserInfo
   */
  async getUserInfo() {
    const { ctx } = this;
    const user = ctx.session.user;
    if(!user) {
      ctx.throw(500, '请先登录')
    }
    ctx.success(user)
  }

  /**
   * @summary 更新用户密码
   * @description 更新用户密码
   * @router post /user/updatePassword
   * @request body updatePasswordRequest *body
   */
  async updatePassword() {
    const { ctx } = this;
    const payload = ctx.request.body || {};
    const user = ctx.session.user;
    const { oldPassword, newPassword } = payload;
    if(!oldPassword || !newPassword) {
      ctx.throw(500, '请输入原密码和新密码')
    }
    const users = await ctx.service.user.findByUsername(user.username)
    const isVaild = await ctx.service.user.verifyPassword(oldPassword, users.password)
    if(!isVaild) {
      ctx.throw(500, '原密码不正确')
    }
    const success = await ctx.service.user.updateUserInfo(users.id, { password: newPassword });
    if(success) {
      ctx.success({ message: '密码修改成功' });
    } else {
      ctx.fail(500, '密码修改失败')
    }
  }

  /**
   * @summary 用户信息配置
   * @description 用户信息配置
   * @router post /user/updateUserConfig
   * @request body updateUserConfigRequest *body
   */
  async updateUserConfig() {
    const { ctx } = this;
    const payload = ctx.request.body || {};
    const {
      pushGoldMinPrice,
      pushGoldMaxPrice,
      pushGoldTime,
      goldExpectedChange,
    } = payload
    // 校验参数，所有字段中不能都为空
    if(!pushGoldMinPrice && !pushGoldMaxPrice && !pushGoldTime && !goldExpectedChange) {
      ctx.throw(500, '请输入配置信息')
    }
    const user = ctx.session.user;
    const users = await ctx.service.user.findByUsername(user.username)
    const success = await ctx.service.user.updateUserInfo(users.id, {
      pushGoldMinPrice,
      pushGoldMaxPrice,
      pushGoldTime,
      goldExpectedChange,
    });
    if(success) {
      ctx.success({ message: '用户配置信息修改成功' });
    } else {
      ctx.fail(500, '用户配置信息修改失败')
    }
  }
}

module.exports = UserController;