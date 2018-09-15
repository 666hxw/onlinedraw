const Service = require('egg').Service;
class UtilService extends Service {
  // 判断 token 是否存在
  async isExistToken(token) {
    const ret = await this.app.redis.get('token').get(token);
    return ret;
  }

  // 保存用户登录态到redis
  async keepAlive(token, userId) {
    const { app, config } = this;
    const { cacheExpire } = config;
    await app.redis.get('userToken').setex(userId, cacheExpire.user, token); // 存储用户信息
    await app.redis.get('token').setex(token, cacheExpire.token, userId); // 存储登录态
    return true;
  }

  // 缓存用户信息到 redis
  async cacheUserInfo(user) {
    const { _id, name, password, email } = user;
    const { app, config } = this;
    const { cacheExpire } = config;
    await app.redis.get('userInfo').hset(name, '_id', _id);
    await app.redis.get('userInfo').hset(name, 'name', name);
    await app.redis.get('userInfo').hset(name, 'email', email);
    await app.redis.get('userInfo').hset(name, 'password', password);
    await app.redis.get('userInfo').expire(name, cacheExpire.user); // 设置过期时间
  }

  // 从 redis 根据 token 获取对应用户信息
  async getUserFromByToken(token) {
    const { app } = this;
    const name = await app.redis.get('token').get(token); // 根据 token 获取 用户名
    if (!name) {
      return null;
    }
    const ret = await app.redis.get('userInfo').hgetall(name); // 根据用户名获取用户信息
    return ret;
  }

  // 根据用户名获取 token
  async getTokenByUserName(name) {
    const { app } = this;
    const token = await app.redis.get('userToken').get(name);
    return token;
  }

  // 根据用户名清除缓存
  async clearCacheByName(name) {
    const { app, ctx } = this;
    const token = await this.getTokenByUserName(name);
    await app.redis.get('userInfo').del(name);
    await app.redis.get('userToken').del(name);
    await app.redis.get('token').del(token);
  }

}

module.exports = UtilService;