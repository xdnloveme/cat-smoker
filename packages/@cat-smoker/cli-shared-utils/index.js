['env', 'logger'].forEach(key => {
  Object.assign(exports, require(`./lib/${key}`));
});

module.exports.chalk = require('chalk');
