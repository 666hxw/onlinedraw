
module.exports = app => {
  app.get('*', app.controller.app.index); // 前端控制页面路由
  // 用户 API
  require('./router/user')(app);
};
