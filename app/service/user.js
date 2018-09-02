const Service = require('egg').Service;
class UserService extends Service {
  async list(where, page = 1, pageSize = 10) {
    const ret = await this.ctx.model.User.find(where).limit(pageSize).skip(page - 1);
    return ret;
  }

  // 添加、更新
  async edit(data) {
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
      where: {
        _id: id,
      },
    });
    return ret;
  }

  async del(id) {
    const ret = await this.ctx.model.User.remove({
      _id: id,
    });
    return ret;
  }

  // 保存用户信息、登录态到redis
  async keepAlive(sessionId, user) {
    await this.app.redis.get('userInfo').sadd(user.name, user); // 存储用户信息
    await this.app.redis.get('session').sadd(sessionId, user.name); // 存储登录态
    return true;
  }

}
module.exports = UserService;