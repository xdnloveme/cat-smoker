const fs = require('fs');
const globby = require('globby');
const writeFileTree = require('../utils/writeFileTree');
const { isBinaryFileSync } = require('isbinaryfile');
const path = require('path');
const templatePath = '../../../cli-service/lib/template';

const renderFile = function (name) {
  // 如果是二进制流文件（比如favicon.ico）
  if (isBinaryFileSync(name)) {
    return fs.readFileSync(name); // 返回流
  }

  const template = fs.readFileSync(name, 'utf-8');

  return template;
};

module.exports = class Generator {
  constructor (projectName, context) {
    this.projectName = projectName;
    this.context = context;
  }

  async generate () {
    console.log(templatePath);
    const baseDir = path.resolve(__dirname, templatePath);
    console.log(baseDir);
    const _files = await globby(['**'], { cwd: baseDir });

    const filesContentTree = _files.reduce((content, sourcePath) => {
      content[sourcePath] = renderFile(path.resolve(baseDir, sourcePath));
      return content;
    }, {});

    await writeFileTree(this.context, filesContentTree);
  }
};
