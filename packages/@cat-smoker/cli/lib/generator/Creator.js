const { clearConsole } = require('../utils/clearConsole');
const sortObject = require('../utils/sortObject');
const {
  hasGit,
  hasProjectGit,
  log,
  logWithSpinner,
  stopSpinner,
  execa,
  loadModule,
} = require('@cat-smoker/cli-shared-utils');
const { defaults } = require('../options');
const writeFileTree = require('../utils/writeFileTree');
const Generator = require('./Generator');
const getVersions = require('../utils/getVersions');
const PackageManager = require('./PackageManager');

module.exports = class Creator {
  constructor (projectName, context) {
    this.projectName = projectName;
    this.context = context;
  }

  async create (cliOptions, preset = null) {
    const name = this.projectName;
    const context = this.context;

    clearConsole();

    const latestMinor = await getVersions();

    const pkg = {
      name,
      version: '0.1.0',
      private: true,
      devDependencies: {},
    };

    if (!preset) {
      preset = defaults.presets['default'];
    }

    preset.plugins['@cat-smoker/cli-service'] = Object.assign({
      projectName: name
    }, preset)

    const deps = Object.keys(preset.plugins);
    deps.forEach(dep => {
      pkg.devDependencies[dep] =
        preset.plugins[dep].version || (/^@cat-smoker/.test(dep) ? `~${latestMinor}` : `latest`);
    });

    const pm = new PackageManager(context, { pkg });

    // write package.json
    await writeFileTree(context, {
      'package.json': JSON.stringify(pkg, null, 2),
    });

    // check if git repository
    const shouldInitGit = this.shouldInitGit(cliOptions);
    if (shouldInitGit) {
      logWithSpinner(`🗃`, `初始化git仓库...`);
      await this.run('git init');
    }

    stopSpinner();

    log(`⚙\u{fe0f}  安装脚手架插件, 这可能会花费一点时间...`);
    log();
    await pm.install();

    const plugins = await this.resolvePlugins(preset.plugins);
    
    const gen = new Generator(this.context, {
      name: this.projectName,
      pkg: pkg,
      plugins,
      pm,
    });

    gen.generate();
  }

  // { id: options } => [{ id, apply, options }]
  async resolvePlugins (rawPlugins) {
    // ensure cli-service is invoked first and sort
    rawPlugins = sortObject(rawPlugins, ['@cat-smoker/cli-service'], true);
    const plugins = [];
    for (const id of Object.keys(rawPlugins)) {
      const apply = loadModule(`${id}/generator`, this.context) || (() => {});
      const options = rawPlugins[id] || {};
      plugins.push({ id, apply, options });
    }
    return plugins;
  }

  run (command, args) {
    if (!args) {
      [command, ...args] = command.split(/\s+/);
    }
    return execa(command, args, { cwd: this.context });
  }

  // from vue cli tools function
  shouldInitGit (cliOptions) {
    if (!hasGit()) {
      return false;
    }
    // --git
    if (cliOptions.forceGit) {
      return true;
    }
    // --no-git
    if (cliOptions.git === false || cliOptions.git === 'false') {
      return false;
    }
    // default: true unless already in a git repo
    return !hasProjectGit(this.context);
  }
};
