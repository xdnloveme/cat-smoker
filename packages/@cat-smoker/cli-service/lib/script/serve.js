const { chalk, clearConsole, success, info, openBrowser } = require('@cat-smoker/cli-shared-utils');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../utils/webpack.config');
const { chainProcess } = require('../utils/WebpackConfigChain');
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
    inline: true,
  });

  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0);
      });
    });
  });

  let isFirstCompile = true;

  const host = defaults.host;
  const useHttps = defaults.https;
  const port = defaults.port;

  const protocol = useHttps ? 'https' : 'http';

  const url = prepareUrl(protocol, host, port);

  // const configTest = chainProcess(config => {
  //   config
  //     // 修改 entry 配置
  //     .entry('index')
  //     .add('src/index.js')
  //     .end()
  //     // 修改 output 配置
  //     .output.path('dist')
  //     .filename('[name].bundle.js');
  // });

  // console.log('测试', configTest);

  return new Promise((resolve, reject) => {
    // compile done
    compiler.hooks.done.tap('cat-smoker-cli-service serve', stats => {
      if (stats.hasErrors()) {
        return process.exit(1);
      }

      clearConsole();

      // successfully
      success('编译成功！');

      console.log();
      console.log(`  应用本地开发模式已启动:`);
      console.log(`  - 本地地址:   ${chalk.cyan(url.localUrlForTerminal)}`);
      console.log(`  - 局域网地址: ${chalk.cyan(url.lanUrlForTerminal)}`);

      // open browser
      if (isFirstCompile) {
        isFirstCompile = false;

        const browserLocalUrl = url.localUrlForBrowser;
        openBrowser(browserLocalUrl);
      }
    });

    // before Compile
    compiler.hooks.beforeCompile.tap('cat-smoker-cli-service serve', () => {
      console.log();
      info('准备开始编译...');
    });

    server.listen(defaults.port, defaults.host, err => {
      if (!err) {
        reject(err);
      }

      console.log(chalk.cyan('开发服务正在启动......\n'));
    });

    resolve({
      server,
      url,
    });
  });
};
