['env', 'logger', 'spinner', 'module', 'schema', 'openBrowser'].forEach(key => {
  Object.assign(exports, require(`./lib/${key}`));
});

module.exports.chalk = require('chalk');
module.exports.execa = require('execa');
module.exports.semver = require('semver');
