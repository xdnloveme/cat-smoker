const fs = require('fs-extra');
const path = require('path');
const cmdShim = require('util').promisify(require('cmd-shim'))

const linkBin = async function (src, dest) {
  if (!process.env.CAT_SMOKER_DEBUG_MODE) {
    throw new Error(`linkBin 只能用于开发环境`)
  }
  if (process.platform === 'win32') {
    await cmdShim(src, dest)
  } else {
    await fs.ensureDir(path.dirname(dest))
    await fs.symlink(src, dest)
    await fs.chmod(dest, '755')
  }
}

module.exports = function setDevSetup (targetDir) {
  return linkBin(
    require.resolve('@cat-smoker/cli-service/bin/cat-smoker-cli-service'),
    path.join(targetDir, 'node_modules', '.bin', 'cat-smoker-cli-service')
  );
};
