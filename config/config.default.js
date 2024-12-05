/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1732865658106_502';

  // add your middleware config here
  config.middleware = ['timezone'];

  // session
  config.session = {
    key: 'EGG_SESSION',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true, // 每次访问延长 session 的有效期
  }

  // 定义数据库
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '182.92.237.216',
      // 端口号
      port: '3306',
      // 用户名
      user: 'financialHelper',
      // 密码
      password: 'yizhou12',
      // 数据库名
      database: 'financialhelper'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };

  // swaggerdoc 配置
  config.swaggerdoc = {
    dirScanner: './app/controller', // 扫描的 API 文件夹路径
    apiInfo: {
      title: 'FinancialHelper', // 自定义标题
      description: 'API 文档', // API 描述
      version: '1.0.0', // 版本号
    },
    schemes: ['http', 'https'], // 协议
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false, // 是否开启安全验证
    enable: true,
    routerMap: true,
    enableAll: true,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
