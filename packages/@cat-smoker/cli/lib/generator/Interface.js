const deepmerge = require('deepmerge');
const mergeDeps = require('../utils/mergeDeps');

const isPlainObject = function (obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
};

const mergeArrayWithDedupe = (a, b) => Array.from(new Set([...a, ...b]));

module.exports = class Interface {
  constructor (id, generator, pluginOptions) {
    this.id = id;
    this.generator = generator;
    this.pluginOptions = pluginOptions;
    // 先只支持npm
    this.bin = 'npm';
  }

  // 扩展package
  async extendPackage (fields, options = {}) {
    const extendOptions = {
      prune: false,
      merge: true,
      warnIncompatibleVersions: true,
    };

    // this condition statement is added for compatiblity reason, because
    // in version 4.0.0 to 4.1.2, there's no `options` object, but a `forceNewVersion` flag
    if (typeof options === 'boolean') {
      extendOptions.warnIncompatibleVersions = !options;
    } else {
      Object.assign(extendOptions, options);
    }

    const pkg = this.generator.pkg;
    const toMerge = typeof fields === 'function' ? fields(pkg) : fields;
    for (const key in toMerge) {
      const value = toMerge[key];
      const existing = pkg[key];
      if (isPlainObject(value) && (key === 'dependencies' || key === 'devDependencies')) {
        // use special version resolution merge
        pkg[key] = mergeDeps(
          this.id,
          existing || {},
          value,
          this.generator.depSources,
          extendOptions
        );
      } else if (!extendOptions.merge || !(key in pkg)) {
        pkg[key] = value;
      } else if (Array.isArray(value) && Array.isArray(existing)) {
        pkg[key] = mergeArrayWithDedupe(existing, value);
      } else if (isObject(value) && isObject(existing)) {
        pkg[key] = deepmerge(existing, value, { arrayMerge: mergeArrayWithDedupe });
      } else {
        pkg[key] = value;
      }
    }
  }
};
