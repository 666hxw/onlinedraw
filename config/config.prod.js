/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */


module.exports = app => {
  const exports = {};

  // db config
  exports.mongoose = {
    url: 'mongodb://127.0.0.1/onlinedraw',
    options: {},
  };

  // redis config
  exports.redis = {
    clients: {
      userInfo: { // 用户信息
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '123456',
        db: 0,
      },
      userToken: { // 用户有效token信息
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '123456',
        db: 1,
      },
      token: { // 用户登录态
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '123456',
        db: 2,
      },
    },
  };

  // 缓存失效时间
  exports.cacheExpire = {
    token: 300000, // 300s
    user: 300000, // 300s
  };
  return exports;
};
