module.exports = app => {
  app.router.get('/api/draw/list', app.controller.draw.list);
  app.router.get('/api/draw/detail', app.controller.draw.detail);
  app.router.post('/api/draw/save', app.controller.draw.save);
  app.router.get('/api/draw/del', app.controller.draw.del);
};
