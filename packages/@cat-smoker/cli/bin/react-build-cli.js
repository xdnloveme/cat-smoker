#!/usr/bin/env node

const program = require('commander');
const minimist = require('minimist');
const { logger } = require('@cat-smoker/cli-shared-utils');

program.version(require('../package').version);

program
  .usage('<command> [options]')
  .command('create <app-name>')
  .description('create a new react project')
  .action((name, cmd) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      logger.log(
        'Info: You provided more than one argument. The first one will be used as the appName, check it by cat-smoker --help.'
      );
    }
    // console.log('指令', cmd);
    const options = cmd.options;
    require('../lib/create')(name, options)
  });

program
  .command('add', 'add module to exist project')
  .command('delete', 'delete a module from project')

  .command('list', 'list all the modules');

// 解析命令行参数
program.parse(process.argv);
