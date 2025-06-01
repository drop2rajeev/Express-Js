const path = require('path');

// Set a global rootPath and path
global.__rootDir = path.resolve(__dirname);
global.path = path; // optional, for convenience

module.exports = global.__rootDir;