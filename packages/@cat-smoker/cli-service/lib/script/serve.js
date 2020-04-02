const { chalk } = require('@cat-smoker/cli-shared-utils')
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const defaults = {
  host: '0.0.0.0',
  port: 8000,
  https: false
}

module.exports = function () {
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, {
    logLevel: 'silent',
    clientLogLevel: 'silent',
  });
  
  console.log()
  console.log(`  应用本地开发模式已启动:`)
  console.log(`  - 本地地址:   ${chalk.cyan('http://localhost:8000/')}`)
  console.log(`  - 局域网地址: ${chalk.cyan('http://localhost:8000/')}`)

  return new Promise((resolve, reject) => {
    resolve({
      server,
      url: 'http://localhost:8000/'
    })

    server.listen(defaults.port, defaults.host, err => {
      if (err) {
        reject(err);
      }
    });
  })
  
  
}


