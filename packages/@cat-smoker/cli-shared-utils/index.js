['env', 'logger', 'spinner', 'module', 'schema'].forEach(key => {
  Object.assign(exports, require(`./lib/${key}`));
});

module.exports.chalk = require('chalk');
module.exports.execa = require('execa');
module.exports.semver = require('semver');
