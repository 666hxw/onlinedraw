const Service = require('egg').Service;
class DrawService extends Service {
  async list(where, page = 1, pageSize = 10) {
    const ret = await this.ctx.model.User.find(where).limit(pageSize).skip(page - 1);
    return ret;
  }

  // 添加、更新
  async save(data) {
    const { ctx } = this;
    let ret = '';
    let draw = '';
    const user = this.service.user.getUserInfoFromCache(data.token); // 获取用户信息
    if (!user) {
      ctx.body = {
        code: 403,
        msg: '非法用户',
      };
      return;
    }
    if (data.id) { // 更新画板信息
      ret = await this.ctx.model.Draw.update({
        _id: data.id,
      }, {
        name: data.name,
        data: data.data,
      });
    } else { // 添加用户
      draw = this.ctx.model.Draw();
      draw.name = data.name || '画板-' + new Date().getTime();
      draw.userid = user._id; // 当前用户id
      draw.data = data.data;
      ret = await draw.save();
    }
    return ret;
  }

  async detail(id) {
    const ret = await this.ctx.model.Draw.findOne({
      _id: id,
    }, {
      _id: 0,
      __v: 0,
    });
    return ret;
  }

  async del(id) {
    const ret = await this.ctx.model.Draw.remove({
      _id: id,
    });
    return ret;
  }

}
module.exports = DrawService;