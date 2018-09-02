'use strict';

module.exports = () => {
  // 权限控制
  return async (ctx, next) => {
    await next();
  };
};