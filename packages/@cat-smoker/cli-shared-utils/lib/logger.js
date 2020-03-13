const chalk = require('chalk');

const logInfo = console.log;
const logError = console.error;
const logWarn = console.warn;

const prefix = 'cat-somker';

module.exports.info = msg => logInfo(`${chalk.hex('#3333').bgBlue(`${prefix}INFO `)} ${msg}`);

module.exports.error = msg => logError(`${chalk.hex('#3333').bgRed(`${prefix}ERROR `)} ${msg}`);

module.exports.warn = msg => logWarn(`${chalk.hex('#3333').bgYellow(`${prefix}WARN `)} ${msg}`);

module.exports.success = msg =>
  logInfo(`${chalk.hex('#3333').bgGreen(`${prefix}SUCCESS `)} ${msg}`);

module.exports.log = (msg, color = 'cyan') => logInfo(`${chalk[color](`\n${msg}`)}`);
