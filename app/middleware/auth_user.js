'use strict';

module.exports = () => {
  // 根据 token 验证用户是否认证
  return async (ctx, next) => {
    await next();
  };
};