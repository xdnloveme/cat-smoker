// proxy to joi for option validation
exports.createSchema = fn => fn(require('@hapi/joi'))