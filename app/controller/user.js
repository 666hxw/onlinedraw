const Controller = require('egg').Controller;
class UserController extends Controller {
  * list() {
    const query = this.ctx.query;
    const where = {
      name: `/${query.kw}/`,
    };
    const page = this.ctx.query.pageIndex;
    const pageSize = this.ctx.query.pageSize;
    this.ctx.body = yield this.service.user.list(where, page, pageSize);
  }

  * edit() {
    const data = this.ctx.query;
    this.ctx.body = yield this.service.user.edit(data);
  }

  * detail() {
    const id = this.ctx.query.id;
    this.ctx.body = yield this.service.user.detail(id);
  }

  * del() {
    const id = this.ctx.query.id;
    this.ctx.body = yield this.service.user.del(id);
  }
}

module.exports = UserController;