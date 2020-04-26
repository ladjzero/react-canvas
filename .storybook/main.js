const custom = require('../webpack.config.js');

module.exports = {
  stories: ['../src/**/*.stories.[tj]s[x]'],
  webpackFinal: (config) => {
    return { ...config, ...custom, module: { ...config.module, rules: custom.module.rules } };
  }
};
