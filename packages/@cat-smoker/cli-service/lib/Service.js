const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const defaults = {
  host: '0.0.0.0',
  port: 8000,
  https: false
}

module.exports = class Service {
  constructor (context) {
    this.context = context;
  }

  run (command) {
    switch (command) {
      case 'serve':
        this.runServe();
        break;
      default:
        this.runServe();
        break;
    }
  }

  runServe () {
    const compiler = webpack(webpackConfig)
    console.log('编译是', webpackConfig);
    const server = new WebpackDevServer(compiler);
    
    server.listen(defaults.port, defaults.host, err => {
      console.log('报错了');
      if (err) {
        reject(err)
      }
    })
  }
}
