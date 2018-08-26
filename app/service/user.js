const Service = require('egg').Service;
class UserService extends Service {
  * list(where, page = 1, pageSize = 10) {
    const ret = yield this.ctx.model.User.find({});
    return ret;
  }

  // 添加、更新
  * edit(data) {
    let ret = '';
    let user = {};
    if (data.id) { // 更新用户信息
      user = {
        name: data.name,
      };
      ret = yield this.ctx.model.User.update(data.id, user);
    } else { // 添加用户
      user = this.ctx.model.User();
      user.name = data.name;
      user.password = data.password;
      ret = yield user.save();
    }
    return ret;
  }

  * detail(id) {
    const ret = yield this.ctx.model.User.findOne({
      where: {
        _id: id,
      },
    });
    return ret;
  }

  * del(id) {
    const ret = yield this.ctx.model.User.remove({
      _id: id,
    });
    return ret;
  }
}
module.exports = UserService;