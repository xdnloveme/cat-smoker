#!/usr/bin/env node

const program = require('commander');
const minimist = require('minimist');

program.version(require('../package').version);

program
  .usage('<command> [options]')
  .command('create <app-name>')
  .description('create a new react project')
  .action((name, cmd) => {
    console.log(223);
    // console.log('指令', name, cmd);
  });

program
  .command('add', 'add module to exist project')
  .command('delete', 'delete a module from project')
  
  .command('list', 'list all the modules');

// 解析命令行参数
program.parse(process.argv);
