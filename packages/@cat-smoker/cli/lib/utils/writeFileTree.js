const fs = require('fs-extra')
const path = require('path')

module.exports = async function writeFileTree (dir, files) {
  console.log('哈哈哈进来了', files);
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name)
    console.log('每个path是', filePath);
    fs.ensureDirSync(path.dirname(filePath))
    fs.writeFileSync(filePath, files[name])
  })
}
