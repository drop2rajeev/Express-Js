require('dotenv').config();
const path = require('path');

// Load the shared DB connection config using the global base path
const { dbConnection } = require(path.join(global.__basedir, 'config/database'));

module.exports = {
  development: dbConnection,
  production: dbConnection,
  test: dbConnection
};