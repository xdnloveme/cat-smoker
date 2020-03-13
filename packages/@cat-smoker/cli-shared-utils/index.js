['logger'].forEach((key) => {
  Object.assign(exports, {
    [key]: require(`./lib/${key}`),
  });
});

module.exports.chalk = require('chalk');
