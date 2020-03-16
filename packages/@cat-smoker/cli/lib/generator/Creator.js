const { clearConsole } = require('../utils/clearConsole');
const writeFileTree = require('../utils/writeFileTree');
const Generator = require('./Generator');

module.exports = class Creator {
  constructor (projectName, context) {
    this.projectName = projectName;
    this.context = context;
  }

  async create () {
    const name = this.projectName;
    const context = this.context;

    clearConsole();

    const pkg = {
      name,
      version: '0.1.0',
      private: true,
      devDependencies: {},
    }

    // write package.json
    await writeFileTree(context, {
      'package.json': JSON.stringify(pkg, null, 2)
    })


    const gen = new Generator(this.projectName, this.context);

    gen.generate();
  }
}