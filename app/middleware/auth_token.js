'use strict';

module.exports = () => {
  // 验证token是否有效
  return async (ctx, next) => {
    const header = ctx.request.header;
    // if (!header.auth_token) { // 不存在 token
    //   if () {

    //   }
    //   ctx.status = 403;
    //   ctx.body = 'forbidden';
    //   return;
    // }
    await next();
  };
};