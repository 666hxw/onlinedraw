module.exports = app => {
  app.router.get('/api/user/list', app.controller.user.list);
  app.router.get('/api/user/detail', app.controller.user.detail);
  app.router.get('/api/user/create', app.controller.user.edit);
  app.router.get('/api/user/update', app.controller.user.edit);
  app.router.get('/api/user/del', app.controller.user.del);
  app.router.post('/api/user/signIn', app.controller.user.signIn);
};
