#!/usr/bin/env node

const slash = require('slash');
const fs = require('fs')
const path = require('path');

// enter debug mode when creating test repo
if (
  slash(process.cwd()).indexOf('/packages/test') > 0 && (
    fs.existsSync(path.resolve(process.cwd(), '../@cat-smoker')) ||
    fs.existsSync(path.resolve(process.cwd(), '../../@cat-smoker'))
  )
) {
  process.env.CAT_SMOKER_DEBUG_MODE = true
}

const program = require('commander');
const minimist = require('minimist');
const { log } = require('@cat-smoker/cli-shared-utils');

program.version(require('../package').version);

program
  .version(`@cat-smoker/cli ${require('../package').version}`)
  .usage('<command> [options]')

program
  .command('create <app-name>')
  .description('create a new react project')
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
  .option('-d, --default', 'Skip prompts and use default preset')
  .option('-l, --local', 'Module context require local url')
  .option('-g, --git [message]', 'Force git initialization with initial commit message', true)
  .option('-n, --no-git', 'Skip git initialization')
  .action((name, cmd) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      log(
        'Info: You provided more than one argument. The first one will be used as the appName, check it by cat-smoker --help.'
      );
    }

    const options = cleanArgs(cmd)
    if (process.argv.includes('-g') || process.argv.includes('--git')) {
      options.forceGit = true
    }
    
    require('../lib/create')(name, options);
  });

program
  .command('add', 'add module to exist project')
  .command('delete', 'delete a module from project')

  .command('list', 'list all the modules');

// 解析命令行参数
program.parse(process.argv);



function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
