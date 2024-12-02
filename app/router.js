/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/gold/price', controller.price.index);
  router.post('/gold/price', controller.price.create);
  router.get('/gold/price/today', controller.price.today);
  router.get('/gold/price/history', controller.price.history);
};
