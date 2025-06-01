require('dotenv').config();
const path = require('path');

// Load the shared DB connection config using the global base path
const { dbConnection } = require(path.resolve(__basedir, 'config/database'));

module.exports = {
  development: dbConnection,
  production: dbConnection,
  test: dbConnection
};