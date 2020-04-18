const { chalk } = require('@cat-smoker/cli-shared-utils');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const prepareUrl = require('../utils/prepareUrl');

const defaults = {
  host: '0.0.0.0',
  port: 8000,
  https: false,
};

module.exports = function (options) {
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, {
    logLevel: 'silent',
    clientLogLevel: 'silent',
  });

  const host = defaults.host;
  const useHttps = defaults.https;
  const port = defaults.port;

  const protocol = useHttps ? 'https' : 'http';

  const url = prepareUrl(protocol, host, port);

  console.log();
  console.log(`  应用本地开发模式已启动:`);
  console.log(`  - 本地地址:   ${chalk.cyan(url.localUrlForTerminal)}`);
  console.log(`  - 局域网地址: ${chalk.cyan(url.lanUrlForTerminal)}`);

  return new Promise((resolve, reject) => {
    server.listen(defaults.port, defaults.host, err => {
      if (!err) {
        reject(err);
      }
    });

    resolve({
      server,
      url,
    });
  });
};
