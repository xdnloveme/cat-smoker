const { semver, warn } = require('@cat-smoker/cli-shared-utils');

const leadRE = /^(~|\^|>=?)/;
const rangeToVersion = r => r.replace(leadRE, '').replace(/x/g, '0');

const tryGetNewerRange = (r1, r2) => {
  const v1 = rangeToVersion(r1);
  const v2 = rangeToVersion(r2);
  if (semver.valid(v1) && semver.valid(v2)) {
    return semver.gt(v1, v2) ? r1 : r2;
  }
};

const extractSemver = r => r.replace(/^.+#semver:/, '');
const injectSemver = (r, v) =>
  semver.validRange(r) ? v : r.replace(/#semver:.+$/, `#semver:${v}`);

const isValidRange = range => {
  if (typeof range !== 'string') {
    return false;
  }

  const isValidSemver = !!semver.validRange(range);
  const isValidGitHub = range.match(/^[^/]+\/[^/]+/) != null;
  const isValidURI =
    range.match(/^(?:file|git|git\+ssh|git\+http|git\+https|git\+file|https?):/) != null;

  return isValidSemver || isValidGitHub || isValidURI;
};

module.exports = function mergeDeps (
  depId,
  sourceDeps,
  depsToInject,
  sources,
  { prune, warnIncompatibleVersions }
) {
  const result = Object.assign({}, sourceDeps);

  for (const depName in depsToInject) {
    const sourceRange = sourceDeps[depName];
    const injectingRange = depsToInject[depName];
    

    // if they are the same, do nothing. Helps when non semver type deps are used
    if (sourceRange === injectingRange) continue;

    if (prune && injectingRange == null) {
      delete result[depName];
      continue;
    }

    if (!isValidRange(injectingRange)) {
      warn(
        `invalid version range for dependency "${depName}":\n\n` +
          `- ${injectingRange} injected by generator "${depId}"`
      );
      continue;
    }
    const sourceGeneratorId = sources[depName];
    if (!sourceRange) {
      result[depName] = injectingRange;
      sources[depName] = depId;
      
    } else {
      const sourceRangeSemver = extractSemver(sourceRange);
      const injectingRangeSemver = extractSemver(injectingRange);
      const r = tryGetNewerRange(sourceRangeSemver, injectingRangeSemver);
      const didGetNewer = !!r;

      // if failed to infer newer version, use existing one because it's likely
      // built-in
      result[depName] = didGetNewer ? injectSemver(injectingRange, r) : sourceRange;

      // if changed, update source
      if (result[depName] === injectingRange) {
        sources[depName] = depId;
      }

      // warn incompatible version requirements
      if (
        warnIncompatibleVersions &&
        (!semver.validRange(sourceRangeSemver) ||
          !semver.validRange(injectingRangeSemver) ||
          !semver.intersects(sourceRangeSemver, injectingRangeSemver))
      ) {
        warn(
          `conflicting versions for project dependency "${depName}":\n\n` +
            `- ${sourceRange} injected by generator "${sourceGeneratorId}"\n` +
            `- ${injectingRange} injected by generator "${depId}"\n\n` +
            `Using ${didGetNewer ? `newer ` : ``}version (${
              result[depName]
            }), but this may cause build errors.`
        );
      }
    }
  }
  return result;
};
