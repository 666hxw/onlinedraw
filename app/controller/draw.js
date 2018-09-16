'use strict';

const Controller = require('egg').Controller;

class DrawController extends Controller {
  async list() {
    const query = this.ctx.query;
    let where = {};
    if (query.kw) {
    // TODO 匹配检索中出现的多个反斜杠 \
      where = {
        name: new RegExp(`${query.kw}`),
      };
    }
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 10;
    const ret = await this.service.draw.list(where, page, pageSize);
    if (ret) {
      this.ctx.body = {
        code: 200,
        msg: '',
        data: ret,
      };
    } else {
      this.ctx.body = {
        code: 500,
        msg: '服务器内部错误',
        data: {},
      };
    }
  }

  async save() {
    const data = this.ctx.request.body;
    const ret = await this.service.draw.save(data);
    if (ret) {
      this.ctx.body = {
        code: 200,
        msg: '',
        data: {}
      };
    } else {
      this.ctx.body = {
        code: 500,
        msg: '保存失败',
        data: {}
      };
    }
  }

  async detail() {
    const id = this.ctx.query.id;
    const ret = await this.service.draw.detail(id);
    if (ret) {
      this.ctx.body = {
        code: 200,
        msg: '',
        data: ret,
      };
    } else {
      this.ctx.body = {
        code: 500,
        msg: '获取信息失败',
        data: {},
      };
    }
  }

  async del() {
    const id = this.ctx.query.id;
    this.ctx.body = await this.service.draw.del(id);
  }
}

module.exports = DrawController;