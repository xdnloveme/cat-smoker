const { execSync } = require('child_process');
const LRUCache = require('lru-cache');

let _hasGit;
// 创建一个缓存区，长度为10，过期时间1000ms
// 缓存项目的git status状态是否存在
const _gitProjects = new LRUCache({
  max: 10,
  maxAge: 1000,
})

// check if git installed
module.exports.hasGit = function () {
  if (_hasGit !== undefined) {
    return _hasGit;
  }

  try {
    execSync('git --version', { stdio: 'ignore' });
    _hasGit = true;
    return _hasGit;
  } catch (e) {
    _hasGit = false
    return _hasGit;
  }
}

// 判断是否已经存在git仓库
// cwd: context
module.exports.hasProjectGit = (cwd) => {
  if (_gitProjects.has(cwd)) {
    return _gitProjects.get(cwd)
  }

  let result
  try {
    execSync('git status', { stdio: 'ignore', cwd })
    result = true
  } catch (e) {
    result = false
  }
  _gitProjects.set(cwd, result)
  return result
}
