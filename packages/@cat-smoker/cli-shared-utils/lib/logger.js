const chalk = require('chalk');
const readline = require('readline');
const stripAnsi = require('strip-ansi');

const logInfo = console.log;
const logError = console.error;
const logWarn = console.warn;

const prefix = 'cat-smoker-';

module.exports.info = msg => logInfo(`${chalk.hex('#3333').bgBlue(`${prefix}INFO `)} ${msg}`);

module.exports.error = msg => logError(`${chalk.hex('#3333').bgRed(`${prefix}ERROR `)} ${msg}`);

module.exports.warn = msg => logWarn(`${chalk.hex('#3333').bgYellow(`${prefix}WARN `)} ${msg}`);

module.exports.success = msg =>
  logInfo(`${chalk.hex('#3333').bgGreen(`${prefix}SUCCESS `)} ${msg}`);

module.exports.log = (msg = '') => {
  console.log(msg);
};

module.exports.clearConsole = title => {
  // 根据isTTY 判断是否位于终端上下文
  // 这个照搬的vue-cli的判断，虽然我觉得这个没啥意义判断
  // 存在这个判断的意义就是 区分一般的终端环境和其他文件环境，达到不同环境显示不同颜色的目的
  // 好吧，只有这个解释了，但是我觉得无所谓这个判断，不喜欢的可以去掉
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.log(title);
    }
  }
};
