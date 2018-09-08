'use strict';

module.exports = () => {
  // 认证用户
  return async (ctx, next) => {
    await next();
  };
};