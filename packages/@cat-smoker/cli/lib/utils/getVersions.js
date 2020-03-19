const { semver } = require('@cat-smoker/cli-shared-utils')

let sessionCached
module.exports = async function getVersions () {
  if (sessionCached) {
    return sessionCached
  }

  let latest
  const local = require(`../../package.json`).version
  console.log('local', local);
  // should also check for prerelease versions if the current one is a prerelease
  return local;

  // let error

  // // if the installed version is updated but the cache doesn't update
  // if (semver.gt(local, latest) && !semver.prerelease(local)) {
  //   latest = local
  // }

  // let latestMinor = `${semver.major(latest)}.${semver.minor(latest)}.0`
  // if (
  //   // if the latest version contains breaking changes
  //   /major/.test(semver.diff(local, latest)) ||
  //   // or if using `next` branch of cli
  //   (semver.gte(local, latest) && semver.prerelease(local))
  // ) {
  //   // fallback to the local cli version number
  //   latestMinor = local
  // }

  // return (sessionCached = {
  //   current: local,
  //   latest,
  //   latestMinor,
  //   error
  // })
}