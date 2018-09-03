
module.exports = app => {
  // 用户 API
  require('./router/user')(app);
  // 画板 API
  require('./router/draw')(app);
  app.get('*', app.controller.app.index); // 前端控制页面路由
};
