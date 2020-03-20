const { executeCommand } = require('../utils/executeCommand');

const isPlainObject = function (obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
};

const PACKAGE_MANAGER_CONFIG = {
  npm: {
    install: ['install', '--loglevel', 'error'],
    add: ['install', '--loglevel', 'error'],
    upgrade: ['update', '--loglevel', 'error'],
    remove: ['uninstall', '--loglevel', 'error'],
  },
};

module.exports = class PackageManager {
  constructor (context, { pkg }) {
    this.context = context;
    this.pkg = pkg;
    // 先只支持npm
    this.bin = 'npm';
  }
  
  async runCommand (command, args) {
    return await executeCommand(
      this.bin,
      [...PACKAGE_MANAGER_CONFIG[this.bin][command], ...(args || [])],
      this.context
    );
  }

  async install () {
    return await this.runCommand('install');
  }
};
