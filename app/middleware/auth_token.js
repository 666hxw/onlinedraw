'use strict';

module.exports = () => {
  // 验证 token 是否有效
  return async (ctx, next) => {
    const cookies = ctx.cookies;
    const token = cookies.get('token', { signed: false });
    const isIgnorePath = ctx.helper.isIgnorePath(ctx.path); // 是否是 api 请求路由

    if (!isIgnorePath) {
      if (!token) { // cookie 中不存在 token
      } else {
        const isExistToken = await ctx.service.util.isExistToken(token);
        if (!isExistToken) {
          ctx.status = 200;
          ctx.body = {
            code: 403,
            msg: 'token expire',
          };
          return;
        }
      }
    }
    await next();
  };
};