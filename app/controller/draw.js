'use strict';

const validator = require('validator');
const Controller = require('egg').Controller;

class DrawController extends Controller {
  // 登录
  async signIn() {
    const { ctx, service } = this;
    const name = validator.trim(ctx.request.body.name || '').toLowerCase();
    const password = validator.trim(ctx.request.body.password || '');
    const code = validator.trim(ctx.request.body.code || '');
    let msg;

    if ([ name, password, code ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    } else if (!ctx.helper.validateName(name) && !validator.isEmail(name)) {
      msg = '用户名/邮箱不合法';
    }
    // else if () {
    //   msg = '验证码不合法';
    // }

    // 检验不通过
    if (msg) {
      ctx.body = {
        code: 401,
        state: {
          code: 401,
          msg,
        },
        data: {},
      };
      return;
    }

    const userInfo = await service.user.list({
      password,
      $or: [
        { name },
        { email: name },
      ],
    });

    if (!userInfo || !userInfo.length) {
      // 用户不存在
      ctx.body = {
        code: 401,
        state: {
          code: 401,
          msg: '用户名/邮箱不存在，或者密码错误',
        },
        data: {},
      };
      return;
    }

    // 这里不用清除 redis 中的登录态信息，只要重新覆盖 key 为用户名的值即可，因为 redis 中的登录态是 set 结构
    // 但是 session 会存在很多无用数据
    const sessionId = uuid(); // 生成一个登录态id
    // TODO 保存用户登录态到redis
    await service.user.keepAlive(sessionId, userInfo[0]);
    // 在当前实例中保存用户信息
    ctx.user = userInfo[0];
    // SPA 使用 token 方式 做验证
    ctx.body = {
      code: 200,
      state: {
        code: 200,
        msg: '登陆成功',
      },
      data: {
        token: sessionId, // 讲 sessionId 作为 token 返回给前端
      },
    };
  }
  async list() {
    const query = this.ctx.query;
    const where = {
      name: `/${query.kw}/`,
    };
    const page = this.ctx.query.pageIndex;
    const pageSize = this.ctx.query.pageSize;
    this.ctx.body = await this.service.user.list(where, page, pageSize);
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