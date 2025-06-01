const express = require('express');
require('dotenv').config(); // Load environment variables

// Initialize Express application instance
const appService = express();

// Setup database connection using Knex
const knexConfig = require(path.join(__rootDir, 'config/database'));
const knex = require('knex')(knexConfig.dbConnection);

// Make knex instance available throughout the app
appService.locals.knex = knex;

// Register routes
require(path.join(__rootDir, 'app/Providers/RouteServiceProvider'))(appService);

// Register view engine and setup
require(path.join(__rootDir, 'app/Providers/ViewServiceProvider'))(appService);

// Middleware to parse JSON requests
appService.use(express.json());

// Export the configured Express app instance
module.exports = appService;