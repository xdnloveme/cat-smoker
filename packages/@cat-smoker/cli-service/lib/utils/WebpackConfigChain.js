const Config = require('webpack-chain');
const config = new Config();

exports.chainProcess = function (cb) {
  cb(config);

  return config.toConfig();
}