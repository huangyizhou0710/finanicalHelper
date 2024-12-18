/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  schedule: {
    enable: true,
    package: 'egg-schedule',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  }
};
