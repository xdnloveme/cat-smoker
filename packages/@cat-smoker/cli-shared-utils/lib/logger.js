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
  // 判断是否终端处于最后一行
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
