const fs = require('fs');
const globby = require('globby');
const writeFileTree = require('../utils/writeFileTree');
const Interface = require('../generator/Interface');
const { isBinaryFileSync } = require('isbinaryfile');
const path = require('path');
const templatePath = '../../../cli-service/generator/template';

const renderFile = function (name) {
  // 如果是二进制流文件（比如favicon.ico）
  if (isBinaryFileSync(name)) {
    return fs.readFileSync(name); // 返回流
  }

  const template = fs.readFileSync(name, 'utf-8');

  return template;
};

module.exports = class Generator {
  constructor (context, { pkg, plugins, pm }) {
    this.context = context;
    this.pkg = pkg;
    this.plugins = plugins;
    this.pm = pm;
    this.depSources = {};
  }

  async initPlugins () {
    for (const plugin of this.plugins) {
      const { id, apply, options } = plugin;
      const api = new Interface(id, this, options);
      await apply(api, options);
    }
  }

  async generate () {
    this.initPlugins();
    const baseDir = path.resolve(__dirname, templatePath);
    const _files = await globby(['**'], { cwd: baseDir });
    const filesContentTree = _files.reduce((content, sourcePath) => {
      content[sourcePath] = renderFile(path.resolve(baseDir, sourcePath));
      return content;
    }, {});

    filesContentTree['package.json'] = JSON.stringify(this.pkg, null, 2) + '\n'

    await writeFileTree(this.context, filesContentTree);
  }
};
