/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/gold/price', controller.price.index);
  router.post('/gold/price', controller.price.create);
  router.get('/gold/price/today', app.middleware.authenticate() ,controller.price.today);
  router.get('/gold/price/history', controller.price.history);
  router.post('/asset/addOrUpdateAsset', app.middleware.authenticate(), controller.asset.addOrUpdateAsset);
  router.get('/asset/getUserAssets', app.middleware.authenticate(), controller.asset.getUserAssets);
  router.get('/asset/getGoldAsset', app.middleware.authenticate(), controller.asset.getGoldAsset);
  router.post('/goldTransaction/addTransaction', app.middleware.authenticate(), controller.goldTransaction.addTransaction);
  router.get('/goldTransaction/getTransactions', app.middleware.authenticate(), controller.goldTransaction.getTransactions);
};
