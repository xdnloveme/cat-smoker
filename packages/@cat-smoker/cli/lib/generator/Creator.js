const { clearConsole } = require('../utils/clearConsole');
const Generator = require('./Generator');

module.exports = class Creator {
  constructor (projectName, context) {
    this.projectName = projectName;
    this.context = context;
  }

  async create () {
    clearConsole();

    const gen = new Generator(this.projectName, this.context);

    gen.generate();
  }
}