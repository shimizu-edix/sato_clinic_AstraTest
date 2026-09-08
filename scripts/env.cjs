const path = require('node:path');
const runtime = path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
exports.existing = name => require(require.resolve(name, {paths:[runtime]}));
