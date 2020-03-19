const { semver } = require('@cat-smoker/cli-shared-utils')

let sessionCached
module.exports = async function getVersions () {
  if (sessionCached) {
    return sessionCached
  }

  const local = require(`../../package.json`).version
  return local;
}