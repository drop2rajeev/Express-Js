require('../../../rootDir');

// Load the shared DB connection config using the global base path
const { dbConnection } = require(path.resolve(__rootDir, 'config/database'));

module.exports = {
  development: dbConnection,
  production: dbConnection,
  test: dbConnection
};