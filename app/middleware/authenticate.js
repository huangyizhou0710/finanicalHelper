module.exports = () => {
  return async function authenticate(ctx, next) {
    if(!ctx.session || !ctx.session.user) {
      ctx.throw(401, '请先登录')
    }
    await next()
  }
}