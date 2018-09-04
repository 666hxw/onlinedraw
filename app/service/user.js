const Service = require('egg').Service;
class UserService extends Service {
  async list(where, page = 1, pageSize = 10) {
    const ret = await this.ctx.model.User.find(where).limit(pageSize).skip(page - 1);
    return ret;
  }

  // 添加、更新
  async save(data) {
    let ret = '';
    let user = {};
    if (data.id) { // 更新用户信息
      user = {
        name: data.name,
      };
      ret = await this.ctx.model.User.update(data.id, user);
    } else { // 添加用户
      user = this.ctx.model.User();
      user.name = data.name;
      user.password = data.password;
      ret = await user.save();
    }
    return ret;
  }

  async detail(id) {
    const ret = await this.ctx.model.User.findOne({
      _id: id,
    });
    return ret;
  }

  async del(id) {
    const ret = await this.ctx.model.User.remove({
      _id: id,
    });
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
  async getUserInfoFromCache(token) {
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
    const token = await ctx.service.user.getTokenByUserName(name);
    await app.redis.get('userInfo').del(name);
    await app.redis.get('userToken').del(name);
    await app.redis.get('token').del(token);
  }
}
module.exports = UserService;