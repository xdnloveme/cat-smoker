const fs = require('fs-extra');
const path = require('path');

module.exports = async function writeFileTree (dir, files) {
  Object.keys(files).forEach(name => {
    let fileName = name;
    if (fileName === 'gitignore') {
      fileName = '.gitignore';
    }
    const filePath = path.join(dir, fileName);
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, files[fileName]);
  });
};
