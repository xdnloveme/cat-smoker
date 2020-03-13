const { clearConsole } = require('../utils/clearConsole');

module.exports = class Creator {
  constructor (projectName, context) {
    this.projectName = projectName;
    this.context = context;
  }

  async create () {
    clearConsole();
  }
}